const mongoose = require("mongoose");
const UploadSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Upload", UploadSchema);
