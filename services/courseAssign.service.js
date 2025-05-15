const mongoose = require("mongoose");
const courseAssignModel = require("../models/courseAssign.model");


exports.save = async (data) => {
  try {
    let save = await courseAssignModel.create(data);
    if (!save) {
      return null;
    }
    return save;
  } catch (e) {
    return e;
  }
};

exports.chcekExist = async (courseId,memberId) => {
  try {
    return  await courseAssignModel.findOne({courseId:courseId,memberId:memberId});
   
  } catch (e) {
    return e;
  }
};

exports.getAssignedCourse = async (memberId) => {
  try {
    return await courseAssignModel.aggregate([
      {
        $match: {memberId:new mongoose.Types.ObjectId(memberId)},
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
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          memberId: 0,
        },
      },
    ]);
   
  } catch (e) {
    return e;
  }
};

