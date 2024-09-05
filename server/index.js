const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("./models/Employee.js");
const UploadRoute = require("./routes/UploadRoute.js");

require("dotenv").config();

const app = express();
app.use(express.json()); // Use JSON body parsing middleware
app.use(express.static("public")); //static
const corsOptions = {
  origin: "https://navigatef.vercel.app", // Add your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Enable credentials (cookies, etc.)
};

app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests
app.options("*", cors(corsOptions));


app.use(cookieParser());
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.d56c7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);
app.use(UploadRoute);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("There token is Missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("There token is wrong");
      } else {
        req.email = decoded.email;
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ email: req.email, name: req.name });
});

/*app.post("/Signin",  (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, name: user.name },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json("**Success");
          } else {
            return res.json("Password is Incorrect");
          }
        });
      } else {
        res.json("*Please first Signup no record found");
      }
    })
    .catch((err) => res.json(err));
}); */
app.post("/SignIn", async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await EmployeeModel.findOne({ email });

    if (!employee) {
      return res
        .status(404)
        .send("Employee with this email not found. Please sign up first");
    }

    const isPasswordCorrect = await bcrypt.compare(password, employee.password);

    if (!isPasswordCorrect) {
      return res.status(400).send("Password incorrect.");
    }

    const token = jwt.sign({ email, name: employee.name }, "jwt-secret-key", {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    res.status(200).send("Employee signed In");
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: err.message });
  }
});

app.post("/Signup", async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyPresent = await EmployeeModel.findOne({ email: email });

  if (alreadyPresent) {
    return res.status(400).send("Employee with this email already exists.");
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const addedEmployee = await EmployeeModel.create({
    name,
    email,
    password: hashedpassword,
  });

  res.status(201).send(`Employee created: ${addedEmployee}`);
});

/*app.post("/Signup", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({ name, email, password: hash })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => {
      console.log(err);
    });
});*/
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json("**Success");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
