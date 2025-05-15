const jwt = require("jsonwebtoken");
const userService = require("../../services/auth.service");
const utils = require("../../helper/utils");
// POST /v1/api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, gender } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email || email === "") {
      return res.status(400).json({ message: "email is required" });
    }
    if (!password || password === "") {
      return res.status(400).json({ message: "password is required" });
    }
    if (!phone || phone === "") {
      return res.status(400).json({ message: "phone is required" });
    }
    if (!gender || gender === "") {
      return res.status(400).json({ message: "gender is required" });
    }
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(401).json({ message: "Email already registered" });
    }

    let userdata = {
      ...req.body,
      role: "admin",
    };

    let saveData = await userService.save(userdata);
    if (saveData) {
      return res
        .status(200)
        .json({ status: true, message: "Account registered successfully",data:saveData });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to register" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /v1/api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "email is required" });
    }
    if (!password || password.trim() === "") {
      return res.status(400).json({ message: "password is required" });
    }
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "User is not exist" });
    }

    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Password Not Matched" });
    }
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = utils.createUserAccessToken(payload);
    user.token = token;
    await user.save();

    return res.status(200).json({
      status: true,
      message: `logged in successfully`,
      token,
      data: user,
    });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
