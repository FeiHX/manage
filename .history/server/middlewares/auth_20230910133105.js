const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')
const basicAuth = require('basic-auth')

class Auth {
    get middleware() {
       return (ctx,next) => {
         ba
        }
    }
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