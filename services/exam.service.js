const examModel = require("../models/exam.mode");
const mongoose = require("mongoose");
exports.save = async (data) => {
  try {
    let save = await examModel.create(data);
    if (!save) {
      return null;
    }
    return save;
  } catch (e) {
    return e;
  }
};

exports.checkExam = async (data) => {
  try {
    return await examModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(data) },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: { path: "$course", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "questions",
          localField: "questions",
          foreignField: "_id",
          as: "questions",
        },
      },
    ]);
  } catch (e) {
    return e;
  }
};

exports.getExamList = async (courseId, pagination) => {
  try {
    let matchQuery = { courseId: new mongoose.Types.ObjectId(courseId) };
    const { page, limit } = pagination || {};

    let pipeline = [
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: { path: "$course", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "questions",
          localField: "questions",
          foreignField: "_id",
          as: "questions",
        },
      },

      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          courseId: 0,
        },
      },
    ];
    if (pagination.page && pagination.limit) {
      pipeline.push({ $skip: (page - 1) * limit }, { $limit: limit });
    }
    const exams = await examModel.aggregate(pipeline);
    // console.log("get exam",exams)
    const totalExams = await examModel.countDocuments(matchQuery);
    const response = {
      exams,
      totalExams,
    };

    if (page && limit) {
      response.page = parseInt(page);
      response.limit = parseInt(limit);
      response.totalPages = Math.ceil(totalExams / parseInt(limit));
    }
    return response;
  } catch (e) {
    return e;
  }
};
