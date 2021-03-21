const express = require ('express');
const memberController = require('../controllers/memberController');
const multer = require('../middlewares/multer-config');
const jwtUtils = require('../utils/jwt.utils');

const memberRouter = express();

// Ajouter un membre au groupe
memberRouter.post('/members', multer, jwtUtils.authenticateJWT, (request,response)=>{
    const adminId = request.user.adminId;
    memberController.addMember(request, response, adminId);
});

// Récupérer un membre du groupe par son id
memberRouter.get('/members/:id', memberController.getMemberById);

// Récupérer tous les membres du groupe
memberRouter.get('/members', memberController.getAllMembers);

// Mise à jour d'un membre du groupe
memberRouter.put('/members/:id', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    memberController.updateMember(request, response, adminId);
});

// Suppression d'un membre du groupe
memberRouter.delete('/members/:id', jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    memberController.deleteMember(request, response, adminId);
})

module.exports = memberRouter;