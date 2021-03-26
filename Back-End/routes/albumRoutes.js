const express = require('express');
const albumController = require('../controllers/albumController');
const multer = require('../middlewares/multer-config');
const jwtUtils = require('../utils/jwt.utils');

const albumRouter = express();

// Route pour ajouter un nouvel album
albumRouter.post('/albums', multer, jwtUtils.authenticateJWT,(request,response)=>{
    const adminId = request.user.adminId;
    albumController.addAlbum(request,response,adminId);
})

// Route pour récupérer un album par son id
albumRouter.get('/albums/:id', albumController.getAlbumById);

// Route pour récupérer tous les albums
albumRouter.get('/albums', albumController.getAllAlbums);

// Route pour mettre à jour un album
albumRouter.put('/albums/:id', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    albumController.updateAlbum(request, response, adminId);
})

// Route pour supprimer un album
albumRouter.delete('/albums/:id', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    albumController.deleteAlbum(request, response, adminId);
})









module.exports = albumRouter;