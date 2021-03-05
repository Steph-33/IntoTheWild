const express = require('express');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes');


const router = express.Router();

router.use(userRouter);
router.use(adminRouter);

module.exports = router;