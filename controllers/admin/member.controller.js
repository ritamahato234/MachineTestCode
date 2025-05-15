
const userService = require("../../services/auth.service");
const memberService = require("../../services/member.service");



exports.memberAdd = async (req, res) => {
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
      return res.status(401).json({ message: "Email already exist" });
    }

    let userdata = {
      ...req.body,
      role: "member",
    };

    let saveData = await userService.save(userdata);
    if (saveData) {
      return res
        .status(200)
        .json({ status: true, message: "Member added successfully",data:saveData });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to add member" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getMemberList = async (req, res) => {
  try {
    const { page, limit } = req.query;
    
    const pagination = {};
    if (page && limit) {
      pagination.page = parseInt(page);
      pagination.limit = parseInt(limit);
    }
   
    const response = await memberService.getMembersList( pagination);

     return res.status(200).json({
      status: true,
      message: 'Members fetched successfully',
      data: response.data,
       pagination: {
          totalData: response.totaldata,
          currentPage: response.page,
          totalPages: Math.ceil(response.totaldata / limit),
          limit: response.limit,
        },
    });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ status: false, message: "Internal Server error" });
  }
};



