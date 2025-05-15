const mongoose = require("mongoose");
const examAttemptsModel = require("../models/examAttempts.model");

exports.save = async (data) => {
  try {
    let save = await examAttemptsModel.create(data);
    if (!save) {
      return null;
    }
    return save;
  } catch (e) {
    return e;
  }
};

exports.getResults = async ({ courseId, examId, memberId }) => {
  try {
    const filter = {};
    if (courseId) {
      filter.courseId = new mongoose.Types.ObjectId(courseId);
    }
    if (examId) {
      filter.examId = new mongoose.Types.ObjectId(examId);
    }
    if (memberId) {
      filter.memberId = new mongoose.Types.ObjectId(memberId);
    }
    // console.log("filte",filter)
    const results = await examAttemptsModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "users",
          localField: "memberId",
          foreignField: "_id",
          as: "member",
        },
      },
      { $unwind: "$member" },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $lookup: {
          from: "exams",
          localField: "examId",
          foreignField: "_id",
          as: "exam",
        },
      },
      { $unwind: "$exam" },
       {
      $project: {
        _id: 1,
        courseName: "$course.courseName",
        examName: "$exam.examName",
        memberName: "$member.name",
        submitDate:1,
        obtainedMarks: 1,
        totalMarks: 1,
        passed: 1,
      },
    },
    ]);
    console.log("result",results)
    if (!results) {
      return null;
    }
    return results;
  } catch (e) {
    console.log("errinresult",e)
    return e;
  }
};
