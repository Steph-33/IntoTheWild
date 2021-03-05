const express = require('express');
const adminController = require('../controllers/adminController');
const multer = require('../middlewares/multer-config');
const jwtUtils = require('../utils/jwt.utils');

const adminRouter = express.Router();

adminRouter.get('/admin/me/', jwtUtils.authenticateJWT, async (request, response) => {
    const administrator = await adminController.getAdministratorById(request.user.adminId);
    response.status(201).json(administrator);
  });

adminRouter.post('/admin/register/', multer, adminController.register);
adminRouter.post('/admin/login/', adminController.login);

module.exports = adminRouter;
