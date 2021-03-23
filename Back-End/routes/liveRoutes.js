const { request } = require('express');
const express = require('express');
const liveController = require('../controllers/liveController');
const multer = require('../middlewares/multer-config');
const jwtUtils = require('../utils/jwt.utils');

const liveRouter = express();

// Ajout d'un nouveau concert
liveRouter.post('/lives', multer, jwtUtils.authenticateJWT, (request,response)=>{
    const adminId = request.user.adminId;
    liveController.addLive(request,response,adminId);
});

// Récupération d'un concert par son id
liveRouter.get('/lives/:id', liveController.getLiveById);

// récupération de tous les concerts
liveRouter.get('/lives', liveController.getAllLives);

// Mise à jour d'un concert
liveRouter.put('/lives/:id', multer, jwtUtils.authenticateJWT, (request,response)=>{
    const adminId = request.user.adminId;
    liveController.updateLive(request, response, adminId);
});

// Suppression d'un concert
liveRouter.delete('/lives/:id', jwtUtils.authenticateJWT, (request,response)=>{
    const adminId = request.user.adminId;
    liveController.deleteLive(request, response, adminId);
})

module.exports = liveRouter;