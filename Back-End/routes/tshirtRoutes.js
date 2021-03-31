const express = require('express');
const multer = require('../middlewares/multer-config');
const jwtUtils = require('../utils/jwt.utils');
const tshirtController = require('../controllers/tshirtController');

const tshirtRouter = express();

// Route pour ajouter un T-Shirt à la boutique
tshirtRouter.post('/tshirts', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    tshirtController.addTShirt(request,response, adminId);
});

// Route pour récupérer un T-Shirt par son id
tshirtRouter.get('/tshirts/:id', tshirtController.getTShirtById);

// Route pour récupérer l'ensemble des T-Shirts
tshirtRouter.get('/tshirts', tshirtController.getAllTShirts);

// Route pour mettre à jour les informations sur un T-Shirt
tshirtRouter.put('/tshirts/:id', multer, jwtUtils.authenticateJWT,(request, response)=>{
    const adminId = request.user.adminId;
    tshirtController.updateTShirt(request, response, adminId);
});

// Route pour supprimer un T-Shirt de la boutique
tshirtRouter.delete('/tshirts/:id', jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    tshirtController.deleteTShirt(request,response, adminId);
});

module.exports = tshirtRouter;