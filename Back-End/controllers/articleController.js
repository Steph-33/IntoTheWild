const models = require('../models');

module.exports = {
    // Ajouter un article
    addArticle : async (request, response) => {
        const article = {
            title : request.body.title, 
            content : request.body.content,
            date : request.body.date,
            image : `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
            }`,
        }
        for(const key in article){
            if(key == null){
                return response.status(404).json({
                    error : `Le champs ${key} n'est pas renseigné.❌`
                });
            }
        }
        const articleFound = await models.Article.findOne({
            attributes : ['title'],
            where : {title : article.title},
        });
        if(!articleFound){
            const newArticle = await models.Article.create({
                title : article.title, 
                content : article.content,
                date : article.date,
                image : article.image,
            })
            if(newArticle){
                return response.status(201).json({
                    id : newArticle.id,
                    title : newArticle.title,
                    content : newArticle.content,
                    date : newArticle.date,
                    image : newArticle.image,
                })
            } else {
                return response.status(401).json({
                    error : `Impossible d'ajouter cet article. ❌`
                })
            }
        } else {
            return response.status(409).json({
                error : 'Un article existe déjà avec un titre similaire. ❌',
            })
        }
    },

    // Récupérer un article par son id
    getArticleById : async (request, response) => {
        await models.Article.findOne({
            attributes : ['id','title','content', 'date', 'image'],
            where : {id : request.params.id},
        })
        .then((articleFound) => {
            return response.status(200).json({
                id : articleFound.id, 
                title : articleFound.title, 
                content : articleFound.content, 
                date : articleFound.date, 
                image : articleFound.image, 
            })
        })
        .catch(() => {
            return response.status(404).json({
                error : "Aucun article n'as été trouvé avec cet id ❌"
            })
        })
    },

    // Récupérer tous les articles
    getAllArticles : (request, response) => {
        models.Article.findAll({
            attributes : ['id','title','content', 'date', 'image']
        })
        .then((articles)=>{
            return response.status(200).json(articles);
        });
    },

    // Mettre à jour un article
    updateArticle : (request,response) => {
        const article = {
            id : request.params.id,
            title : request.body.title,
            content : request.body.content,
            date : request.body.date,
            image : `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
            }`,
        }   
        models.Article.update(article, {where : {id : request.params.id}})
            .then(() => {
                return response.status(201).json({
                   message : `L'article a été mis à jour avec succès ! `
                })
            })
            .catch(() => {
                return response.status(400).json({
                    error : `L'article n'a pas pu être mis à jour. ❌`
                })
            })
    },

    // Supprimer un article
    deleteArticle : async (request, response) => {
        await models.Article.findOne({where : {id : request.params.id}})
        .then(async (articleFound)=>{
            await models.Article.destroy({where : {id : articleFound.id}})    
            .then(()=>{
                return response.status(200).json({
                    message : `L'article a été supprimé avec succès ! `
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `L'article n'a pas pu être supprimé ! ❌`
                })
            })
        })
        .catch(()=>{
            return response.status(400).json({
                error : `L'article que vous voulez supprimer n'existe pas ! ❌`
            })
        })
    },
}