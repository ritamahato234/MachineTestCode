const examService = require("../../services/exam.service");
const examAttemptService = require("../../services/examAttempt.service");


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

exports.submitExam = async (req, res) => {
  try {
    const userId = req.user.id;
    const { examId, answers } = req.body;

    if (!examId) {
      return res
        .status(400)
        .json({ status: false, message: "examId is required" });
    }
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "answers is required" });
    }

    const examResult = await examService.checkExam(examId);
    
    const exam = examResult[0]; 
    if (!exam) {
      return res.status(400).json({ status: false, message: "Exam not found" });
    }

    let totalMarks = 0;
    let obtainedMarks = 0;
    let resultAnswers = [];

    for (let question of exam.questions) {
        // console.log("qs--",question)
       
      const userAnswer = answers.find(
        (a) => String(a.questionId) === String(question._id)
      );
       const correctIndex = question.correctAnswerIndex;

      totalMarks += question.marks;

      if (userAnswer) {
        const isCorrect = userAnswer.selectedOption === correctIndex;
        let mark = isCorrect ? question.marks : 0;
        obtainedMarks += mark;

        resultAnswers.push({
          questionId: question._id,
          selectedOption: userAnswer.selectedOption,
          isCorrect,
          markAwarded: mark,
        });
      } else {
        resultAnswers.push({
          questionId: question._id,
          selectedOption: null,
          isCorrect: false,
          markAwarded: 0,
        });
      }
    }
    // console.log("resultans",resultAnswers)

    const passMark = (exam.passPercentage / 100) * totalMarks;
    const isPassed = obtainedMarks >= passMark;

    const result = await examAttemptService.save({
      memberId:userId,
      courseId: exam?.courseId,
      examId:examId,
      obtainedMarks:obtainedMarks,
      totalMarks:totalMarks,
      passed:isPassed,
      answers: resultAnswers,
    });

    return res.status(200).json({
      status: true,
      message: "Exam submitted successfully",
      data: result,
    });
  } catch (error) {
    console.log("submitExam error:", error);
    return res.status(500).json({ status: false, message: "Internal Server error" });
  }
};
