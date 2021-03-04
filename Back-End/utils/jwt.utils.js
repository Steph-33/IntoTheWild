const jwt = require('jsonwebtoken');

const jwtKey = process.env.SESSION_SECRET

module.exports = {
    generateTokenForUser : (userData) =>{
        const token = jwt.sign({ userId = userData.id }, jwtKey, {
            expiresIn: '1h',
        })
        return token;
    },

    generateTokenForAdministrator : (adminData) =>{
        const token = jwt.sign({ adminId = adminData.id }, jwtKey, {
            expiresIn: '1h',
        })
        return token;
    },

    parseAuthorization: (authorization) => {
        return authorization !== null ? authorization.replace('Bearer ', '') : null;
    },

    getUserId: (authorization, response) => {
        let userId = -1;
        const token = module.exports.parseAuthorization(authorization);
        if (token) {
          try {
            const jwtToken = jwt.verify(token, jwtKey);
            if (!jwtToken) {
              return response.status(401).json({
                error: 'Token nul lors de la vérification ! ❌',
              });
            }
            userId = jwtToken.userId;
          } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
              return response.status(401).json({
                error: 'Token invalide lors de la vérification ! ❌',
              });
            }
          }
        }
        return userId;
    },

    getAdministratorId: (authorization, response) => {
        let adminId = -1;
        const token = module.exports.parseAuthorization(authorization);
        if (token) {
          try {
            const jwtToken = jwt.verify(token, jwtKey);
            if (!jwtToken) {
              return response.status(401).json({
                error: 'Token nul lors de la vérification ! ❌',
              });
            }
            adminId = jwtToken.adminId;
          } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
              return response.status(401).json({
                error: 'Token invalide lors de la vérification ! ❌',
              });
            }
          }
        }
        return adminId;
    },

    authenticateJWT: (request, response, next) => {
        const authHeader = request.headers.authorization;
        if (authHeader) {
          const token = authHeader.split(" ")[1];
          jwt.verify(token, jwtKey, (error, user) => {
            if (error) {
              return response.status(403).json({
                error: "Token invalide. Vous devez être connecté(e) pour effectuer cette action. ❌",
              });
            }
            request.user = user;
            next();
          });
        } else {
          return response.status(400).json({
            error: "Mauvaise requête. Le token n'a pas été fourni ❌",
          });
        }
    },
}
