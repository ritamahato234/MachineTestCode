const courseService = require("../../services/course.service");
const courseAssignService = require("../../services/courseAssign.service");


exports.courseAdd = async (req, res) => {
  try {
    const { courseName, description } = req.body;
    if (!courseName || courseName.trim() === "") {
      return res.status(400).json({ message: "courseName is required" });
    }
    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "description is required" });
    }
    const checkCourse = await courseService.chcekExist(courseName);

    if (checkCourse) {
      return res
        .status(400)
        .json({ status: false, message: "this course name already exist" });
    }

    const saveData = await courseService.save(req.body);
    if (saveData) {
      return res.status(200).json({
        status: true,
        message: "Course added successfully",
        data: saveData,
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to add course" });
    }
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ status: false, message: "Internal Server error" });
  }
};

exports.courseAssignToMember = async (req, res) => {
  try {
     const { courseId, memberId } = req.body;

    if (!courseId ) {
      return res.status(400).json({ message: "courseId is required" });
    }
    if (!memberId) {
      return res.status(400).json({ message: "memberId is required" });
    }
    const checkCourse = await courseService.courseFindById(courseId);

    if (!checkCourse) {
      return res
        .status(400)
        .json({ status: false, message: "this course is not exist" });
    }
    const result = await courseAssignService.chcekExist(courseId, memberId);

    if (result) {
      return res.status(400).json({ status: false, message: "Course already assigned to this member" });
    }
    const saveData = await courseAssignService.save(req.body);
    if (saveData) {
      return res.status(200).json({
        status: true,
        message: "Course assigned successfully",
        data: saveData,
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to assign course" });
    }
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ status: false, message: "Internal Server error" });
  }
};

