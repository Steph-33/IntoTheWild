const { request } = require('express');
const models = require('../models');


module.exports = {
    // Ajouter un album à la discographie
    addAlbum : async(request, response) => {
        const album = {
            title : request.body.title,
            date : request.body.date,
            set_list : request.body.set_list,
            price : request.body.price,
            image : `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
            }`,
        }
        for(const key in album){
            if(album[key] == null){
                return response.status(404).json({
                    error : `Le champs ${key} n'a pas été renseigné`
                });
            }
        }
        const albumFound = await models.Album.findOne({
            attributes : ['title'],
            where : {'title' : album.title},
        })
        if(albumFound){
            return response.status(400).json({
                error : `Un album existe déjà avec ce titre.`
            })
        }else{
            const newAlbum = await models.Album.create({
                title : album.title,
                date : album.date,
                set_list : album.set_list,
                price : album.price,
                image : album.image,
            })
            if(newAlbum){
                return response.status(201).json({
                    message : `${newAlbum.title} a bien été ajouté à la discographie.`
                })
            } else {
                return response.status(400).json({
                    error : `Cet album n'a pas pu être ajouté à la discographie.`
                })
            }
            
        }
    },

    // Récupérer un album par son id
    getAlbumById : async (request,response) => {
        const album = await models.Album.findOne({
            attributes : ['title', 'date', 'set_list', 'price', 'image'],
            where : {'id' : request.params.id},
        })
        if(album){
            return response.status(200).json(album)
        } else {
            return response.status(404).json({
                error : `Aucun album ne correspond à cet id. `
            })
        }
    },

    // Récupérer l'ensemble des albums
    getAllAlbums : async(request, response)=>{
        await models.Album.findAll({
            attributes : ['title', 'date', 'set_list', 'price', 'image'],
        })
        .then((albums)=>{
            return response.status(200).json(albums);
        })
        .catch(()=>{
            return response.status(400).json({
                error : `Les albums n'ont pas pu être récupérés.`
            })
        })
    },

    // Mettre à jour un album
    updateAlbum : async (request, response) => {
        const album = await models.Album.findOne({
            attributes : ['id', 'title', 'date', 'set_list', 'price', 'image'],
            where : {id : request.params.id},
        })
        if(album){
            const albumFound = {
                title : request.body.title,
                date : request.body.date,
                set_list : request.body.set_list,
                price : request.body.price,
                image : `${request.protocol}://${request.get('host')}/images/${
                    request.file.filename
                }`,
            }
            await models.Album.update(albumFound, {where : {'id' : request.params.id}})
                .then(()=>{
                    return response.status(201).json({
                        message : `L'album ${albumFound.title} a été modifié avec succès. `
                    })
                })
                .catch(()=>{
                    return response.status(400).json({
                        error : `L'album n'a pas pu être modifié.`
                    })
                })
        } else {
            return response.status(404).json({
                error : `L'album que vous voulez modifier n'existe pas.`
            })
        }
    },

    // Suppression d'un album
    deleteAlbum : async (request, response) => {
        await models.Album.findOne({attributes : ['id','title'], where : {id : request.params.id}})
        .then(async (albumFound)=>{
            await models.Album.destroy({where : {id : albumFound.id}})    
            .then(()=>{
                return response.status(200).json({
                    message : `L'album ${albumFound.title} a été supprimé avec succès ! `
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `L'album ${albumFound.title} n'a pas pu être supprimé ! ❌`
                })
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `L'album que vous voulez supprimer n'existe pas ! ❌`
            })
        })
    },
}



