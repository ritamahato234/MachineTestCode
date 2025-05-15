const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    examName: { type: String, required: true },
    totalMarks: { type: Number  },
    passMarks: { type: Number },
    timeInMinutes: { type: Number },
    passPercentage: { type: Number, default: 40 }, //40%
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  },
  { timestamps:true,versionKey: false }
);

module.exports = mongoose.model("Exam", ExamSchema);
