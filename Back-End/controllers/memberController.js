const { request } = require('express');
const models = require('../models');

module.exports = {
    //Ajouter un membre du groupe
    addMember : async (request,response) => {
        const member = {
            name : request.body.name,
            introduction : request.body.introduction,
            description : request.body.description,
            image :  `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
            }`,
        }
        for(const key in member){
            if(key == null){
                return response.status(404).json({
                    error : `Le champs ${key} n'est pas renseigné ! `
                })
            }
        }
        const memberFound = await models.Member.findOne({
            attibutes : ['name'], 
            where : {'name' : member.name},
        })
        if(!memberFound){
            const newMember = await models.Member.create({
                name : request.body.name,
                introduction : request.body.introduction,
                description : request.body.description,
                image :  `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
                }`,
            });
            if(newMember){
                response.status(201).json({
                    message : `${newMember.name} a bien été ajouté au groupe.`                    
                })
            } else {
                response.status(400).json({
                    error : `${newMember.name} n'a pas pu être ajouté au groupe.`
                })
            }
        } else {
            response.status(409).json({
                error : `Ce membre fait déjà partie du groupe.`
            })
        }
    },

    // Récupérer un membre du groupe par son id
    getMemberById : async (request, response) => {
        const member = await models.Member.findOne({
            attributes : ['id', 'name', 'introduction', 'description', 'image'],
            where : {'id' : request.params.id }
        });
        if(member){
            response.status(201).json({
                id : member.id,
                name : member.name,
                introduction : member.introduction,
                description : member.description,
                image : member.image
            });
        } else {
            response.status(404).json({
                error : `Aucun membre du groupe n'a été trouvé avec cet id. `
            })
        }
    },

    // Récupérer tous les membres du groupe
    getAllMembers : async (request,response) => {
        const members = await models.Member.findAll({
            attributes : ['id', 'name', 'introduction', 'description', 'image'],
        });
        if(members){
            response.status(201).json(members)
        };
    }, 

    // Mettre à jour un membre du groupe
    updateMember : async (request, response) => {
        const member = {
            name : request.body.name,
            introduction : request.body.introduction, 
            description : request.body.description, 
            image :  `${request.protocol}://${request.get('host')}/images/${
                request.file.filename
            }`,
        };
        await models.Member.update(member, {where : {'id' : request.params.id}})
            .then(()=>{
                response.status(201).json({
                    message : `Mise à jour réalisée avec succès.`
                })
            })
            .catch(()=>{
                response.status(404).json({
                    error : `La mise à jour de ce membre n'a pas fonctionné.`
                })
            })
        },
    
    // Supprimer un membre du groupe
    deleteMember : async (request,response) => {
        const member = await models.Member.findOne({
            where : {'id' : request.params.id}
        });
        if(member){
           await models.Member.destroy({where : {'id' : member.id}})
            .then(()=>{
                return response.status(201).json({
                    message : `Ce membre a été supprimé avec succès.`
                })
            })
            .catch(()=>{
                return response.status(400).json({
                    error : `Ce membre n'a pas pu être supprimé.`
                })
            })
        } else {
            return response.status(404).json({
                error : `Ce membre n'existe pas.`
            })
        }
    }
}