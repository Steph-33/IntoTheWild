const express = require('express');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes');
const articleRouter = require('./articleRoutes');
const memberRouter = require('./memberRoutes');


const router = express.Router();

router.use(userRouter);
router.use(adminRouter);
router.use(articleRouter);
router.use(memberRouter);

module.exports = router;