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
















}