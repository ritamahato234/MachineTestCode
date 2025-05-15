const userModel = require("../models/user.model");

exports.findUserByEmail = async (email) => {
  return await userModel.findOne({ email: email });
};
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
exports.createUser = async (userData) => {
  const user = new userModel(userData);
  return await user.save();
};
