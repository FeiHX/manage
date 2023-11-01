const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')


class Auth {
    verifyToken(token){
        try{
           jwt.verify(token,)
        } catch(e) {

        }
    }
}