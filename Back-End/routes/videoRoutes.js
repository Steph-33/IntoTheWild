const express = require('express');
const videoController = require('../controllers/videoController');
const multer = require('../middlewares/multer-config');
const jwtUtils = require('../utils/jwt.utils');

const videoRouter = express();

// Route pour ajouter une vidéo
videoRouter.post('/videos', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    videoController.addVideo(request, response, adminId);
});

// Route pour récupérer une vidéo par son id
videoRouter.get('/videos/:id', videoController.getVideoById);

// Route pour récupérer l'ensemble des vidéos
videoRouter.get('/videos', videoController.getAllVideos);

// Route pour mettre à jour une vidéo
videoRouter.put('/videos/:id', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.id;
    videoController.updateVideo(request, response, adminId);
});

// Route pour supprimer une vidéo
videoRouter.delete('/videos/:id', jwtUtils.authenticateJWT, (request,response)=>{
    const adminId = request.user.adminId;
    videoController.deleteVideo(request, response, adminId);
});

module.exports = videoRouter;