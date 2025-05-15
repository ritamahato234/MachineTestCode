const questionService = require("../../services/question.service");

exports.addQuestion = async (req, res) => {
  try {
    const { text, marks, options, correctAnswerIndex } = req.body;

    if (!text || text === "") {
      return res.status(400).json({ message: "text is required" });
    }
    if (!marks) {
      return res.status(400).json({ message: "marks is required" });
    }
    if (!options) {
      return res.status(400).json({ message: "options is required" });
    }
    if (!correctAnswerIndex) {
      return res
        .status(400)
        .json({ message: "correctAnswerIndex is required" });
    }

    const questionData = await questionService.chcekExist(text);

    if (questionData) {
      return res
        .status(401)
        .json({ message: "this question text already exist" });
    }

    let data = {
      ...req.body,
    };

    let saveData = await questionService.save(data);
    if (saveData) {
      return res.status(200).json({
        status: true,
        message: "Question added successfully",
        data: saveData,
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to add question" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const getData = await questionService.getList({ skip, limit });
    // console.log("getData", getData);
    const totalCount = await questionService.getQuestionCount();
    if (getData) {
      res.status(200).json({
        status: true,
        message: "View question list successfully",
        data: getData,
        pagination: {
          totalData: totalCount,
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          limit: limit,
        },
      });
    } else {
      res.status(400).json({
        status: false,
        message: "No data exist",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
