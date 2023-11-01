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
 const authMiddleware = (req,res) =>{
        console.log(req)
         const jwt = basicAuth(req)
         console.log(jwt);
         next();
         res.send(11)
    }

   
    


module.exports = authMiddleware