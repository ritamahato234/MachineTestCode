const mongoose = require("mongoose");

const CourseAssignmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedDate: { type: Date, default: Date.now },
},
{ timestamps:true,versionKey: false }
);

module.exports = mongoose.model("CourseAssignment", CourseAssignmentSchema);
