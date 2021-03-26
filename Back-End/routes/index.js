const express = require('express');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes');
const articleRouter = require('./articleRoutes');
const memberRouter = require('./memberRoutes');
const liveRouter = require('./liveRoutes');
const albumRouter = require('./albumRoutes');
const pictureRouter = require('./pictureRoutes');


const router = express.Router();

router.use(userRouter);
router.use(adminRouter);
router.use(articleRouter);
router.use(memberRouter);
router.use(liveRouter);
router.use(albumRouter);
router.use(pictureRouter);

module.exports = router;