var express = require('express')
var router = express.Router()
var path = require('path')

const adminController = require("../../controllers/admin/member.controller");
const courseController = require("../../controllers/admin/course.controller");
const questionController = require("../../controllers/admin/question.controller");
const examController = require("../../controllers/admin/exam.controller");


/**
 * @swagger
 * tags:
 *   name: AdminApis
 *   description: admin apis
 */
// member add 
/**
 * @swagger
 * /admin/member-add:
 *   post:
 *     summary: add member 
 *     tags: [AdminApis]
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
 *           example: admin
 *         description: Role type (e.g., member, admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - gender
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */

router.post('/member-add', adminController.memberAdd);
/**
 * @swagger
 * /admin/member-list:
 *   get:
 *     summary: get members list
 *     tags: [AdminApis]
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
 *           example: admin
 *         description: Role type (e.g., member, admin)
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: page no
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: limit
 *     responses:
 *       200:
 *         description: Members fetched successfully
 *       500:
 *         description: Internal server error
 */

router.get('/member-list', adminController.getMemberList);

/**
 * @swagger
 * /admin/course-add:
 *   post:
 *     summary: course add 
 *     tags: [AdminApis]
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
 *           example: admin
 *         description: Role type (e.g., member, admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseName
 *               - description
 *             properties:
 *               courseName:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course added successfully
 *       400:
 *         description: Validation error | this course name already exist
 *       500:
 *         description: Internal server error
 */

router.post('/course-add',courseController.courseAdd );
/**
 * @swagger
 * /admin/question-add:
 *   post:
 *     summary: question add 
 *     tags: [AdminApis]
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
 *           example: admin
 *         description: Role type (e.g., member, admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - marks
 *               - options
 *               - correctAnswerIndex
 *             properties:
 *               text:
 *                 type: string
 *               marks:
 *                 type: number
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswerIndex:
 *                 type: number
 *     responses:
 *       200:
 *         description: Question added successfully
 *       400:
 *         description: Validation error | this question already exist
 *       500:
 *         description: Internal server error
 */

router.post('/question-add',questionController.addQuestion );
/**
 * @swagger
 * /admin/get-question-list:
 *   get:
 *     summary: Get paginated list of questions
 *     tags: [AdminApis]
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
 *           example: admin
 *         description: Role type (e.g., member, admin)
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: page no
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: limit
 *     responses:
 *       200:
 *         description:View question list successfully!
 *       400:
 *         description:  No data exist
 *       500:
 *         description: Internal server error
 */

router.get('/get-question-list',questionController.getQuestion );
/**
 * @swagger
 * /admin/exam-add:
 *   post:
 *     summary: exam add 
 *     tags: [AdminApis]
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
 *           example: admin
 *         description: Role type (e.g., member, admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - examName
 *               - passPercentage
 *               - timeInMinutes
 *               - questions
 *             properties:
 *               courseId:
 *                 type: string
 *               examName:
 *                 type: string
 *               passPercentage:
 *                 type: string
 *               timeInMinutes:
 *                 type: number
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                       - text
 *                       - marks
 *                       - options
 *                       - correctAnswerIndex
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: What is the capital of France?
 *                     marks:
 *                       type: number
 *                       example: 2
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Paris", "London", "Berlin", "Rome"]
 *                     correctAnswerIndex:
 *                       type: number
 *                       example: 0
 *     responses:
 *       200:
 *         description: Question added successfully
 *       400:
 *         description: Validation error | this question already exist
 *       500:
 *         description: Internal server error
 */

router.post('/exam-add',examController.createExam );
/**
 * @swagger
 * /admin/get-examlist-by-course-id:
 *   get:
 *     summary: Get list of exams for a course (with pagination)
 *     tags: [AdminApis]
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
 *           example: admin
 *         description: Role type (e.g., member, admin)
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: course id
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: page
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: limit
 *     responses:
 *       200:
 *         description: Exams fetched successfully
 *       400:
 *         description: validation error
 *       500:
 *         description: Internal server error
 */

router.get('/get-examlist-by-course-id',examController.getExamList );

/**
 * @swagger
 * /admin/course-assign:
 *   post:
 *     summary: course-assign to member 
 *     tags: [AdminApis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - memberId
 *             properties:
 *               courseId:
 *                 type: string
 *               memberId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course assigned successfully
 *       400:
 *         description: Validation error | Failed to assign course | this course is not exist
 *       500:
 *         description: Internal server error
 */

router.post('/course-assign',courseController.courseAssignToMember );
/**
 * @swagger
 * /admin/exam-result:
 *   get:
 *     summary: exam-result by courseId,examId,memberId
 *     tags: [AdminApis]
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
 *           example: admin
 *         description: Role type (e.g., member, admin)
 *       - in: query
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *       - in: query
 *         name: examId
 *         required: false
 *         schema:
 *           type: string
 *         description: the id of exam
 *       - in: query
 *         name: memberId
 *         required: false
 *         schema:
 *           type: string
 *         description: the id of member
 *     responses:
 *       200:
 *         description: Exam results fetched successfully
 *       400:
 *         description:  Validation error
 *       500:
 *         description: Internal server error
 */

router.get('/exam-result',examController.getExamResults );





module.exports = router;
