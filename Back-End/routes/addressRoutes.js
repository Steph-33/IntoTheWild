const express = require('express');
const addressController = require('../controllers/addressController');
const jwtUtils = require('../utils/jwt.utils');

const addressRouter = express();

// Route pour ajouter une adresse
addressRouter.post('/addresses', jwtUtils.authenticateJWT, (request, response)=>{
    const userId = request.user.userId;
    addressController.addAddress(request, response, userId);
});

// Route pour récupérer une adresse par son id
addressRouter.get('/addresses/:id', addressController.getAddressById);

// Route pour récupérer l'ensemble des adresses
addressRouter.get('/addresses', addressController.getAllAddresses);

// Route pour mettre à jour une adresse
addressRouter.put('/addresses/:id', jwtUtils.authenticateJWT, (request, response)=>{
    const userId = request.user.id;
    addressController.updateAddress(request, response, userId);
});

// Route pour supprimer une adresse
addressRouter.delete('/addresses/:id', jwtUtils.authenticateJWT, (request, response)=>{
    const userId = request.user.userId;
    addressController.deleteAddress(request, response, userId);
});

module.exports = addressRouter;