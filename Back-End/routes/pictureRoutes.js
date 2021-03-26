const express = require('express');
const pictureController = require('../controllers/pictureController');
const multer = require('../middlewares/multer-config');
const jwtUtils = require('../utils/jwt.utils');

const pictureRouter = express();

// Route pour ajouter une photo
pictureRouter.post('/pictures', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    pictureController.addPicture(request, response, adminId);
})



module.exports = pictureRouter;