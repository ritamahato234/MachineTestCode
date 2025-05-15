const courseService = require("../../services/course.service");
const courseAssignService = require("../../services/courseAssign.service");




exports.getAssignedCourse = async (req, res) => {
  try {
     const userId = req.user.id;
    //  console.log("get course")
    const getCourse = await courseAssignService.getAssignedCourse(userId);
    if (getCourse) {
      return res.status(200).json({
        status: true,
        message: "get assigned courses successfully",
        data: getCourse,
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "failed to get assigned course" });
    }
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ status: false, message: "Internal Server error" });
  }
};

