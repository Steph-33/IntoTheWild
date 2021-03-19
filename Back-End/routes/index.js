const express = require('express');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes');
const articleRouter = require('./articleRoutes');


const router = express.Router();

router.use(userRouter);
router.use(adminRouter);
router.use(articleRouter);

module.exports = router;