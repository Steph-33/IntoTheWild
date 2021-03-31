const models = require('../models');

module.exports = {
    // Ajouter une T-Shirt à la boutique
    addTShirt : async(request, response)=>{
        const tShirt = {
            reference : request.body.reference,
            size : request.body.size,
            price : request.body.price,
            image : `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
            }`,
        };

        for(const key in tShirt){
            if(tShirt[key] == null){
                return response.status(404).json({
                    error : `Le champs ${key} n'a pas été renseigné.`
                })
            }
        };

        const tShirtFound = await models.Tshirt.findOne({
            attributes : ['reference', 'size', 'price', 'image'],
            where : {'reference' : tShirt.reference} && {'size' : tShirt.size},
        });
        if(!tShirtFound){
            const newTShirt = {
                reference : tShirt.reference,
                size : tShirt.size,
                price : tShirt.price,
                image : tShirt.image,
            };
            await models.Tshirt.create(newTShirt)
            .then(()=>{
                return response.status(201).json({
                    message : `Le T-Shirt '${newTShirt.reference}' taille '${newTShirt.size}' a bien été créé.`
                });
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `Le T-Shirt '${newTShirt.reference}' taille '${newTShirt.size}' n'a pas pu être créé.`
                })
            })
        } else {
            return response.status(400).json({
                error : `La référence '${tShirt.reference}' taille '${tShirt.size}' existe déjà.`
            });
        };
    },

    // Récupérer un T-Shirt par son id
    getTShirtById : async(request, response)=>{
        await models.Tshirt.findOne({
            attributes : ['id','reference','size','price','image'],
            where : {'id': request.params.id},
        })
        .then((tShirtFound)=>{
            return response.status(200).json(tShirtFound);
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Aucun T-Shirt avec l'id n°${request.params.id} n'a été trouvé.`
            })
        })
    },

    // Récupérer l'ensemble des T-Shirts
    getAllTShirts : async(request, response)=>{
        await models.Tshirt.findAll()
        .then((tShirts)=>{
            return response.status(200).json(tShirts);
        })
        .catch(()=>{
            return response.status(400).json({
                error : `La liste des T-Shirts n'a pas pu être récupérée.`
            })
        })
    },

    // Mettre à jour les informations sur un T-Shirt
    updateTShirt : async(request, response)=>{
        await models.Tshirt.findOne({
            attributes : ['id','reference','size','price','image'],
            where : {'id': request.params.id},
        })
        .then(async(tShirtFound)=>{
            const newTShirt = {
                id : tShirtFound.id,
                reference : request.body.reference,
                size : request.body.size,
                price : request.body.price,
                image : `${request.protocol}://${request.get('host')}/images/${
                    request.file.filename
                }`,
            };
            await models.Tshirt.update(newTShirt, {where : {'id' : tShirtFound.id}})
            .then(()=>{
                return response.status(201).json([{
                    message : `Le T-Shirt '${tShirtFound.reference}', taille '${tShirtFound.size}' a bien été mis à jour.`
                },newTShirt]);
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `Désolé, le T-Shirt '${tShirtFound.reference}', taille '${tShirtFound.size}' n'a pas pu être mis à jour.`
                })
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Aucun T-Shirt avec l'id n°${request.params.id} n'a été trouvé.`
            })
        })
    },

    // Supprimer un T-Shirt de la boutique
    deleteTShirt : async(request, response)=>{
        await models.Tshirt.findOne({
            attributes : ['id','reference','size','price','image'],
            where : {'id': request.params.id},
        })
        .then(async(tShirtFound)=>{
            await models.Tshirt.destroy({where : {'id' : tShirtFound.id}})
            .then(()=>{
                return response.status(200).json({
                    message : `Le T-Shirt '${tShirtFound.reference}', taille '${tShirtFound.size}' a bien été supprimé.`
                });
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `Le T-Shirt '${tShirtFound.reference}', taille '${tShirtFound.size}' n'a pas pu être supprimé.`
                });
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Désolé, il n'existe aucun T-Shirt ayant l'id n°${request.params.id}.`
            });
        })
    },
};