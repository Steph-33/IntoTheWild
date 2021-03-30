const models = require('../models');

module.exports = {
    // Ajouter une adresse
    addAddress : async(request, response)=>{
        const address = {
            number : request.body.number,
            road : request.body.road,
            name_of_the_road : request.body.name_of_the_road,
            zip_code : request.body.zip_code,
            city : request.body.city,
            country : request.body.country,
        };

        for(const key in address){
            if(address[key] == null){
                return response.status(404).json({
                    error : `Le champs ${key} n'a pas été renseigné.`
                })
            }
        };

        await models.Address.create(address)
        .then((newAddress)=>{
            return response.status(201).json({
                message : `La nouvelle adresse a bien été créée.`,
                id : newAddress.id,
                numéro : newAddress.number,
                type_de_voie : newAddress.road,
                nom_de_la_voie : newAddress.name_of_the_road,
                code_postal : newAddress.zip_code,
                ville : newAddress.city,
                pays : newAddress.country,
            })
        })
        .catch(()=>{
            return response.status(400).json({
                error : `La nouvelle adresse n'a pas pu être créée.`
            })
        })
    },

    // Récupération d'une adresse par son id
    getAddressById : async(request, response)=>{
        await models.Address.findOne({
            attributes : ['id','number','road','name_of_the_road','zip_code','city','country'],
            where : {'id':request.params.id},
        })
        .then((addressFound)=>{
            return response.status(200).json({
                id : addressFound.id,
                numéro : addressFound.number,
                type_de_voie : addressFound.road,
                nom_de_la_voie : addressFound.name_of_the_road,
                code_postal : addressFound.zip_code,
                ville : addressFound.city,
                pays : addressFound.country,
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Aucune adresse avec l'id n°${request.params.id} n'a été trouvée.`
            })
        })
    },

    // Récupération de toutes les adresses
    getAllAddresses : async(request, response)=>{
        await models.Address.findAll()
        .then((addresses)=>{
            return response.status(200).json(addresses);
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Les adresses enregistrées n'ont pas pu être récupérées.`
            })
        })
    },

    // Mise à jour d'un adresse
    updateAddress : async(request, response)=>{
        await models.Address.findOne({
            attributes : ['id','number','road','name_of_the_road','zip_code','city','country'],
            where : {'id':request.params.id},
        })
        .then(async(addressFound)=>{
            const newAdress = {
                number : request.body.number,
                road : request.body.road,
                name_of_the_road : request.body.name_of_the_road,
                zip_code : request.body.zip_code,
                city : request.body.city,
                country : request.body.country,
            };
            await models.Address.update(newAdress,{where : {'id' : addressFound.id}})
            .then(()=>{
                return response.status(201).json({
                    message : `L'adresse avec l'id n°${request.params.id} a bien été mise à jour.`
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `L'adresse avec l'id n°${request.params.id} n'a pas pu être mise à jour.`
                });
            });
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Il n'y a pas d'adresse correspondant à l'id n°${request.params.id}`
            });
        })
    },

    // Supprimer une adresse
    deleteAddress : async(request,response)=>{
        await models.Address.findOne({
            attributes : ['id'],
            where : {'id' : request.params.id},
        })
        .then(async(addressFound)=>{
            await models.Address.destroy({where : {'id':addressFound.id}})
            .then(()=>{
                return response.status(200).json({
                    message : `L'adresse avec l'id n°${request.params.id} a bien été supprimée.`
                });
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `L'adresse avec l'id n°${request.params.id} n'a pas pu être supprimée.`
                })
            })
        })
        .catch(()=>{
            return response.status(404).json({
                error : `Aucune adresse n'a été trouvée avec l'id n°${request.params.id}.`
            })
        })
    },
};