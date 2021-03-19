const express  = require('express');
const multer = require('../middlewares/multer-config');
const articleController = require('../controllers/articleController');
const jwtUtils = require('../utils/jwt.utils');

const articleRouter = express();

// Récupération d'un article par son id
articleRouter.get('/articles/:id', articleController.getArticleById);

// Récupération de l'ensemble des articles
articleRouter.get('/articles', articleController.getAllArticles);

// Création d'un article
articleRouter.post('/articles', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
    articleController.addArticle(request, response, adminId);
})

// Mise à jour d'un article
articleRouter.put('/articles/:id', multer, jwtUtils.authenticateJWT, (request, response)=>{
    const adminId = request.user.adminId;
        articleController.updateArticle(request,response, adminId);
});

// Suppression d'un article
articleRouter.delete('/articles/:id', jwtUtils.authenticateJWT, (request,response)=>{
    const adminId = request.user.adminId;
    articleController.deleteArticle(request, response, adminId);
});

module.exports = articleRouter;