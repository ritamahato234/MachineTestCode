const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const authRoutes = require('./auth.route');
const adminRoutes = require('./admin.route');
const memberRoutes = require('./member.route');
const authMiddleware = require('../../helper/middleware');
router.use('/auth', authRoutes);
router.use('/admin', authMiddleware,adminRoutes);
router.use('/member', authMiddleware,memberRoutes);

module.exports = router;
