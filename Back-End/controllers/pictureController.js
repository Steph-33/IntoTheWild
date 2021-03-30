const models = require('../models');

module.exports = {
    // Ajout d'une photo
    addPicture : async (request,response)=>{
        const picture = {
            name : request.body.name,
            date : request.body.date,
            image : `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
            }`,
        }

        for(const key in picture){
            if(picture[key] == null){
                return response.status(404).json({
                    error : `Le champs ${key} n'a pas été renseigné.`
                })
            }
        }

        const pictureFound = await models.Picture.findOne({
            attributes : ['name','date','image'],
            where : {'name' : picture.name}
        })
        if(pictureFound){
           return response.status(409).json({
               error : `Une photo avec ce nom existe déjà ! `
           })
        } else {
            const newPicture = await models.Picture.create({
                name : picture.name,
                date : picture.date,
                image : picture.image,
            });
            if(newPicture){
                return response.status(201).json({
                    message : `La photo '${newPicture.name}' a bien été ajoutée.`
                })
            } else {
                return response.status(400).json({
                    error : `La photo '${newPicture.name}' na pas pu être ajoutée.`
                })
            }
        } 
    },

    // Récupération d'une photo par son id
    getPictureById : async(request, response)=>{
        await models.Picture.findOne({
            attributes : ['id','name'],
            where : {'id' : request.params.id},
        })
        .then((pictureFound)=>{
            return response.status(200).json({
                id : pictureFound.id,
                name : pictureFound.name
            });
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Il n'existe aucune photo avec l'id ${request.params.id}.`
            })
        })
    },

    // Récupération de toutes les photos
    getAllPictures : async (request,response)=>{
        await models.Picture.findAll({
            attributes : ['id','name','image'],
        })
        .then((pictures)=>{
            return response.status(200).json(pictures)
        })
        .catch(()=>{
            return response.status(400).json({
                error : `Impossible d'afficher les photos demandées`
            })
        })
    },

    // Mise à jour des informations d'une photo
    updatePicture : async (request, response)=>{
       await models.Picture.findOne({
            attributes : ['id', 'name', 'date', 'image'],
            where : {'id' : request.params.id}
        })
        .then(async(pictureFound)=>{
            const picture = {
                name : request.body.name,
                date : request.body.date,
                image : `${request.protocol}://${request.get('host')}/images/${
                    request.file.filename
                }`,
            }
            await models.Picture.update(picture, {where : {'id' : request.params.id}})
            .then(()=>{
                return response.status(201).json({
                    message : `L'image ${pictureFound.name} a été mise à jour avec succès.`
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    message : `L'image ${pictureFound.name} n'a pas pu être mise à jour.`
                })
            })
        })
        .catch(()=> {
            return response.status(404).json({
                error : `Aucune image n'a été trouvée avec cet id ! `
            })
        })
    },

    // Suppression d'une image
    deletePicture : async(request,response)=>{
        await models.Picture.findOne({
            attributes : ['id', 'name', 'date', 'image'],
            where : {'id' : request.params.id}
        })
        .then(async(pictureFound)=>{
            await models.Picture.destroy({where : {'id' : pictureFound.id}})
            .then(()=>{
                return response.status(200).json({
                    message : `L'image ${pictureFound.name} a été supprimé avec succès.`
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `L'image ${pictureFound.name} n'a pas pu être supprimée. `
                })
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `L'image avec l'id ${request.params.id} n'a pas été trouvée.`
            })
        })
    },
}