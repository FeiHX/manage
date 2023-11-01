const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')


class Auth {
    get
    verifyToken(token){
        try{
           jwt.verify(token,jwtSecret)
           return true
        } catch(e) {
            return false
        }
    }
}

module.exports = Auth