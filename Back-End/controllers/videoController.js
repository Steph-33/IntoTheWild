const models = require('../models')

module.exports = {
    // Ajouter une vidéo
    addVideo : async(request, response) => {
        const video = {
            name : request.body.name,
            date : request.body.date,
            link : request.body.link,
            image : `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
            }`,
        }

        for (const key in video){
            if(video[key] == null){
                return response.status(404).json({
                    error : `Le champs ${key} n'a pas été renseigné.`
                })
            }
        };

        const videoFound = await models.Video.findOne({
            attributes : ['name', 'date', 'link', 'image'],
            where : {'name' : video.name},
        })
        if(!videoFound){
            const newVideo = {
                name : request.body.name,
                date : request.body.date,
                link : request.body.link,
                image : `${request.protocol}://${request.get('host')}/images/${
                    request.file.filename
                }`,
            }
            await models.Video.create(newVideo)
            .then(()=>{
                return response.status(201).json({
                    message : `La vidéo '${newVideo.name}' a bien été créée.`,
                    name : newVideo.name,
                    date : newVideo.date,
                    image : newVideo.image,
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `La vidéo '${newVideo.name}' n'a pas pu être créée.`
                })
            })
        } else {
            return response.status(409).json({
                error : `La vidéo '${video.name}' existe déjà.`
            })
        }
    },

    // Récupérer une vidéo par son id
    getVideoById : async(request, response)=>{
        await models.Video.findOne({
            attributes : ['id','name', 'date', 'link', 'image'],
            where : {'id' : request.params.id},
        })
        .then((videoFound)=>{
            return response.status(200).json({
                id : videoFound.id,
                name : videoFound.name,
                date : videoFound.date,
                link : videoFound.link,
                image : videoFound.image,
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Aucune vidéo n'a pu être trouvée avec l'id ${request.params.id}. `
            })
        })
    },

    // Récupérer l'ensemble des vidéos
    getAllVideos : async(request, response)=>{
        await models.Video.findAll({
            attributes : ['id','name', 'date', 'link', 'image'],
        })
        .then((videos)=>{
            return response.status(200).json(videos)
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Impossible de récupérer les vidéos.`
            })
        })
    },

    // Mettre à jour une vidéo
    updateVideo : async(request, response)=>{
        await models.Video.findOne({
            attributes : ['id','name', 'date', 'link', 'image'],
            where : {'id' : request.params.id},
        })
        .then(async(videoFound)=>{   
            const video = {
                name : request.body.name,
                date : request.body.date,
                link : request.body.link,
                image : `${request.protocol}://${request.get('host')}/images/${
                    request.file.filename
                }`,
            }
            await models.Video.update(video, { where : {'id' : videoFound.id}})
            .then(()=>{
                return response.status(200).json({
                    message : `La vidéo ${videoFound.name} a été mise à jour avec succès.`
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `La vidéo ${videoFound.name} n'a pas pu être mise à jour.`
                })
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `La vidéo que vous voulez mettre à jour n'a pas été trouvée.`
            })
        })
    },

    // Supprimer une vidéo
    deleteVideo : async(request, response)=>{
        await models.Video.findOne({
            attributes : ['id','name'],
            where : {'id': request.params.id},
        })
        .then(async(videoFound)=>{
            await models.Video.destroy({where : {'id' : request.params.id}})
            .then(()=>{
                return response.status(200).json({
                    message : `La vidéo '${videoFound.name}' a bien été supprimée.`
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `La vidéo '${videoFound.name}' n'a pas pu être supprimée.`
                })
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Il n'existe aucune vidéo avec l'id ${request.params.id}`
            })
        })
    },
}