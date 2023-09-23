const { Router } = require("express");
const uploadMiddleware = require("../middlwares/MulterMiddleware");
const UploadModel = require("../models/UploadModel");
const router = Router();

// Define the route for handling file uploads
router.post("/api/save", uploadMiddleware.single("photo"), (req, res) => {
  // Handle file upload here
  try {
    const photo = req.file.filename;
    console.log(photo);

    UploadModel.create({ photo })
      .then((data) => {
        console.log("Upload Successfully");
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.error("Error during upload:", err);
        res.status(500).send("Internal Server Error");
      });
  } catch (err) {
    console.error("Error in /api/save route:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Define a separate route for getting photos
router.get("/api/get", async (req, res) => {
  // Retrieve and send photos here
  try {
    const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
    res.send(allPhotos);
  } catch (err) {
    console.error("Error while retrieving photos:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
