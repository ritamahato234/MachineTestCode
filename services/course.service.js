const courseModel = require("../models/course.model");


exports.save = async (data) => {
  try {
    let save = await courseModel.create(data);
    if (!save) {
      return null;
    }
    return save;
  } catch (e) {
    return e;
  }
};

exports.chcekExist = async (data) => {
  try {
    return  await courseModel.findOne({courseName:data});
   
  } catch (e) {
    return e;
  }
};

exports.courseFindById = async (data) => {
  try {
    return  await courseModel.findById({_id:data});
   
  } catch (e) {
    return e;
  }
};