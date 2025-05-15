const questionModel = require("../models/question.model");


exports.save = async (data) => {
  try {
    let save = await questionModel.create(data);
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
    return  await questionModel.findOne({text:data});
   
  } catch (e) {
    return e;
  }
};

exports.chcekQsExist = async (data) => {
  try {
    return await questionModel.find({_id:{$in:data}},{ marks: 1 });
   
  } catch (e) {
    return e;
  }
};

exports.getList = async (data) => {
  try {
    return await questionModel.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
     
      {
        $skip: data.skip,
      },
      {
        $limit: data.limit,
      },
    ]);
  } catch (e) {
    return e;
  }
};

exports.getQuestionCount = async()=>{
      try {
    return await questionModel.countDocuments();
  } catch (e) {
    return e;
  }
}

