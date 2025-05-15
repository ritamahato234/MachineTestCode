const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    courseName: { type: String, default:""},
    description: { type: String, default: "" },
  },
  { timestamps:true,versionKey: false }
);

module.exports = mongoose.model("Course", CourseSchema);
