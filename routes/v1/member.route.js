var express = require('express')
var router = express.Router()
var path = require('path')
const courseController = require("../../controllers/user/course.controller");
const examController = require("../../controllers/user/exam.controller");


/**
 * @swagger
 * tags:
 *   name: MemberApis
 *   description: member apis
 */

/**
 * @swagger
 * /member/assigned-course-list:
 *   get:
 *     summary: get assigned courses 
 *     tags: [MemberApis]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: User token 
 *       - in: header
 *         name: roletype
 *         required: true
 *         schema:
 *           type: string
 *           example: member
 *         description: Role type (e.g., member, admin)
 *     responses:
 *       200:
 *         description: get assigned courses successfully
 *       400:
 *         description:  failed to get assigned course
 *       500:
 *         description: Internal server error
 */

router.get('/assigned-course-list', courseController.getAssignedCourse);
/**
 * @swagger
 * /member/exam-list-by-course-id:
 *   get:
 *     summary: exam-list-by-course-id 
 *     tags: [MemberApis]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: User token 
 *       - in: header
 *         name: roletype
 *         required: true
 *         schema:
 *           type: string
 *           example: member
 *         description: Role type (e.g., member, admin)
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Exams fetched successfully
 *       400:
 *         description:  Validation error
 *       500:
 *         description: Internal server error
 */

router.get('/exam-list-by-course-id', examController.getExamList);
// exam sumbit 
/**
 * @swagger
 * /member/exam-submit:
 *   post:
 *     summary: exam-submit 
 *     tags: [MemberApis]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: User token 
 *       - in: header
 *         name: roletype
 *         required: true
 *         schema:
 *           type: string
 *           example: member
 *         description: Role type (e.g., member, admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - examId
 *               - answers
 *             properties:
 *               examId:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - questionId
 *                     - selectedOption
 *     responses:
 *       200:
 *         description:  Exam submitted successfully
 *       400:
 *         description: Validation error | exam not found
 *       500:
 *         description: Internal server error
 */

router.post('/exam-submit', examController.submitExam);



module.exports = router;
