const express = require('express');
const pictureController = require('../controllers/pictureController');
const multer = require('../middlewares/multer-config');
const jwtUtils = require('../utils/jwt.utils');

const pictureRouter = express();

// Route pour ajouter une photo
pictureRouter.post('/pictures', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    pictureController.addPicture(request, response, adminId);
});

// Route pour récupérer une photo
pictureRouter.get('/pictures/:id', pictureController.getPictureById);

// Route pour récupérer l'ensemble des photos
pictureRouter.get('/pictures', pictureController.getAllPictures);

// Route pour mettre à jour une image
pictureRouter.put('/pictures/:id', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    pictureController.updatePicture(request, response, adminId);
})

// Route pour la suppression d'une image
pictureRouter.delete('/pictures/:id', jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    pictureController.deletePicture(request, response, adminId);
});

module.exports = pictureRouter;