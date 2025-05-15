const userModel = require("../models/user.model");

exports.save = async (data) => {
  try {
    let save = await userModel.create(data);
    if (!save) {
      return null;
    }
    return save;
  } catch (e) {
    return e;
  }
};

exports.getMembersList = async (pagination) => {
  try {
    const { page, limit } = pagination || {};
    let matchQuery = {
      role: "member",
      isDeleted: false,
    };
    let pipeline = [
      {
        $match: matchQuery,
      },

      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          isDeleted: 0,
        },
      },
    ];
    if (pagination.page && pagination.limit) {
      pipeline.push({ $skip: (page - 1) * limit }, { $limit: limit });
    }
    const data = await userModel.aggregate(pipeline);

    const totaldata = await userModel.countDocuments(matchQuery);
    const response = {
      data,
      totaldata,
    };

    if (page && limit) {
      response.page = parseInt(page);
      response.limit = parseInt(limit);
      response.totalPages = Math.ceil(totaldata / parseInt(limit));
    }
    return response;
  } catch (e) {
    console.log("err", e);
    return e;
  }
};
