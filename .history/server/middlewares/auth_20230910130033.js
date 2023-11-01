const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')


class Auth {
    get midd
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