// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

// Contrôleurs
module.exports = {
  register: async (request, response) => {
    const user = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      password: request.body.password,
      image: `${request.protocol}://${request.get('host')}/images/${
        request.file.filename
      }`,
    };
    const checkEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const checkName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    for (const key in user) {
      if (user[key] == null) {
        return response.status(400).json({
            error : `Mauvaise Requête. Le champs ${key} n'est pas renseigné ❌`
        })
      }
    }
    for (const key in user) {
      if (!isString(user[key])) {
        return response.status(400).json({
            error : `Mauvaise Requête. Le champs ${key} n'est pas une chaîne de caractères. ❌`
        })
      }
    }
    if (!checkName.test(user.firstname)) {
        return response.status(400).json({
            error : `Mauvaise Requête. Le champ firstname est mal renseigné. Vous devez rentrer un prénom valide. ❌`    
        })
    }
    if (!checkName.test(user.lastname)) {
        return response.status(400).json({
            error : `Mauvaise Requête. Le champ lastname est mal renseigné. Vous devez rentrer un nom de famille valide. ❌`
        })
    }
    if (!checkEmail.test(user.email)) {
        return response.status(400).json({
            error : `Mauvaise Requête. Le champ email est mal renseigné ex:hello@contact.com ❌`
        })
    }

    const userFound = await models.User.findOne({
      attributes: ['email'],
      where: { email: user.email },
    });
    if (!userFound) {
      bcrypt.hash(user.password, 5, async (err, bcryptedPassword) => {
        const newUser = await models.User.create({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: bcryptedPassword,
          image: user.image,
        });
        if (newUser) {
          return response.status(201).json({
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
          });
        } else {
            return response.status(500).json({
                error : `Erreur Serveur. Impossible d'ajouter cet utilisateur. ❌`
            })
        }
      });
    } else {
        return response.status(409).json({
            error : 'Mauvaise Requête. Un utilisateur possédant le même email existe déjà. ❌'
        })
    }
  },

  login: async (request, response) => {
    const userInfos = {
      email: request.body.email,
      password: request.body.password,
    };
    for (const key in userInfos) {
      if (userInfos[key] == null) {
          return response.status(400).json({
              error : `Mauvaise Requête. Le champs ${key} n'est pas renseigné ❌`
          })
      }
    }
    const userFound = await models.User.findOne({
      where: { email: userInfos.email },
    });
    if (userFound) {
      bcrypt.compare(
        userInfos.password,
        userFound.password,
        (errBycrypt, resBycrypt) => {
          const userToken = {
            firstname: userFound.firstname,
            lastname: userFound.lastname,
            email: userFound.email,
          };
          if (resBycrypt) {
            return response.status(200).json({
              token: jwtUtils.generateTokenForUser(userFound),
              user: userToken,
            });
          }
          return response.status(403).json({ error: `Mot de passe incorrect ! ❌`, });
        }
      );
    } else {
        return response.status(404).json({
            error : `Ressource introuvable. L'utilisateur demandé n'existe pas ❌`
        })
    }
  },

  getUserSession: async (request, response, cb) => {
    const headerAuth = request.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth, response);
    if (userId < 0) {
        return response.status(400).json({
            error : `Mauvaise Requête. Erreur lors de la lecture de l'id de l'utilisateur ❌`
        })
    }
    const user = await models.User.findOne({
      where: { id: userId },
    });
    if (user) {
      return cb(user.dataValues);
    }else{
        return response.status(404).json({
            error : `Ressource introuvable. Vous devez être connecté pour accéder à cette ressource ❌`
        })
    }
  },

  getUserById : (id) => {
    return models.User.findByPk(id);
  }
};
