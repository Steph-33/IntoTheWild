const { request, response } = require('express');
const models = require('../models');

module.exports= {
    // Ajout d'un concert
    addLive : async(request,response) => {
        const live = {
            place : request.body.place,
            address : request.body.address,
            date : request.body.date,
            image : `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
            }`,
        }
        for(const key in live){
            if(key == null){
                return response.status(404).json({
                    error : `Le champs ${key} n'a pas été renseigné.`
                })
            }
        }
        const newLive = await models.Live.create({
            place : live.place,
            address : live.address,
            date : live.date,
            image : live.image
        });
        if(newLive){
            return response.status(201).json({
                message : `Le nouveau concert a bien été ajouté.`
            });
        } else {
            return response.status(400).json({
                error : `Ce concert n'a pas pu être ajouté.`
            })
        }
    },

    // Récupération d'un concert par son id
    getLiveById : async (request, response) => {
        const live = await models.Live.findOne({
            attributes : ['id', 'place','address', 'date', 'image'],
            where : {'id' : request.params.id},
        });
        if(live){
            return response.status(200).json({
                id : live.id,
                place : live.place,
                address : live.address,
                date : live.date,
                image : live.image,
            });
        } else {
            return response.status(404).json({
                error : `Ce concert n'existe pas.`
            })
        }
    },

    // Récupération de tous les concerts
    getAllLives : async (request,response) => {
        await models.Live.findAll({
            attributes : ['id', 'place','address', 'date', 'image'],
        })
        .then((members)=>{
            return response.status(200).json(members);
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Impossible d'afficher les concerts.`
            })
        })
    },

    // Mise à jour d'un concert
    updateLive : async (request,response) => {
        const live = await models.Live.findOne({
            attributes : ['id', 'place','address', 'date', 'image'],
            where : {'id' : request.params.id},
        })
        if(live){
            const liveFound = {
                place : request.body.place,
                address : request.body.address,
                date : request.body.date,
                image : `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
                }`,
            }
            await models.Live.update(liveFound,{where : {'id' : live.id}})
            .then(()=>{
                return response.status(200).json({
                    message : `Concert mis à jour avec succès.`  
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `Désolé, l'opération a foiré.`
                })
            })
        }else{
            return response.status(404).json({
                error : `Désolé, le concert cherché n'existe pas.`
            })
        }
    },

    // Suppression d'un concert
    deleteLive : async (request,response)=>{
        await models.Live.findOne({where : {'id' : request.params.id}})
        .then(async(liveFound)=>{
            await models.Live.destroy({where : {'id' : liveFound.id}})
            .then(()=>{
                return response.status(200).json({
                    message : `Le concert a bien été supprimé.`
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `Le concert n'a pas pu être supprimé.`
                })
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Le concert avec l'id ${request.params.id} n'a pas été trouvé.`
            })
        })
    }
}