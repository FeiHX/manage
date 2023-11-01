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
 const authMiddleware = (req,res,next) =>{
        
         const jwt = basicAuth(req)
         console.log(jwt);
         next();
        }

   
    


module.exports = middleware