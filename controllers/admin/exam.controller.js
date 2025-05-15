const examService = require("../../services/exam.service");
const courseService = require("../../services/course.service");
const questionService = require("../../services/question.service");
const examAttemptService = require("../../services/examAttempt.service");

exports.createExam = async (req, res) => {
  try {
    const { courseId, examName, passPercentage, timeInMinutes, questions } =
      req.body;

    if (!courseId) {
      return res
        .status(400)
        .json({ status: false, message: "courseId is required" });
    }

    if (!examName || examName.trim() === "") {
      return res
        .status(400)
        .json({ status: false, message: "examName is required" });
    }
    if (!passPercentage) {
      return res
        .status(400)
        .json({ status: false, message: "passPercentage is required" });
    }
    if (!timeInMinutes) {
      return res
        .status(400)
        .json({ status: false, message: "timeInMinutes is required" });
    }
    if (!questions) {
      return res
        .status(400)
        .json({ status: false, message: "questions is required" });
    }
    const checkCourse = await courseService.courseFindById(courseId);

    if (!checkCourse) {
      return res
        .status(400)
        .json({ status: false, message: "Course not found." });
    }
    const questionDocs = await questionService.chcekQsExist(questions);

    if (questionDocs.length !== questions.length) {
      return res
        .status(400)
        .json({ status: false, message: "Some questions not found." });
    }
    const totalMarks = questionDocs.reduce(
      (sum, question) =>
        sum + (typeof question.marks === "number" ? question.marks : 0),
      0
    );
    const passMarks = (passPercentage * totalMarks) / 100;
    const examData = {
      ...req.body,
      totalMarks,
      passMarks,
    };

    const saveData = await examService.save(examData);
    if (saveData) {
      return res.status(200).json({
        status: true,
        message: "Exam added successfully",
        data: saveData,
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to add exam" });
    }
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ status: false, message: "Internal Server error" });
  }
};

exports.getExamList = async (req, res) => {
  try {
    const { page, limit, courseId } = req.query;
    if (!courseId) {
      res.status(400).json({ status: false, message: "courseId is required" });
    }
    const pagination = {};
    if (page && limit) {
      pagination.page = parseInt(page);
      pagination.limit = parseInt(limit);
    }
    const response = await examService.getExamList(courseId, pagination);

    return res.status(200).json({
      status: true,
      message: "Exams fetched successfully",
      data: response.exams,
      pagination: {
        totalData: response.totalExams,
        currentPage: response.page,
        totalPages: Math.ceil(response.totalExams / limit),
        limit: response.limit,
      },
    });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ status: false, message: "Internal Server error" });
  }
};

exports.getExamResults = async (req, res) => {
  try {
    const { courseId, examId, memberId } = req.query;

    const results = await examAttemptService.getResults({
      courseId,
      examId,
      memberId,
    });

    return res.status(200).json({
      status: true,
      message: "Exam results fetched successfully",
      data: results,
    });
  } catch (error) {
    console.log("getExamResults error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};
