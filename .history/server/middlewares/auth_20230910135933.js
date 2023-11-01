const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')
const basicAuth = require('basic-auth')

const verifyToken = (token) => {
    try{
        jwt.verify(token,jwtSecret)
        return true
    } catch(e) {
        return false
        }  
}
 const authMiddleware = (ctx,next) =>{
        // console.log(req)
         const jwt = basicAuth(ctx.request)
         console.log(jwt);
         next();
        }

   
    


module.exports = authMiddleware