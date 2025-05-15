const mongoose = require('mongoose');

const examAttemptSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selectedOptionIndex: { type: Number }
  }],
  submitDate: { type: Date, required: true, default: Date.now },
  totalMarks:{type: Number},
  obtainedMarks: { type: Number },
  passed: { type: Boolean },
},  { timestamps:true,versionKey: false });

module.exports = mongoose.model('ExamAttempt', examAttemptSchema);
