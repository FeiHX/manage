const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')
const basicAuth = require('basic-auth')

 const middleware = () =>{
       ctx,next) => {
         const jwt = basicAuth(ctx.request)
         console.log(jwt);
         next();
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