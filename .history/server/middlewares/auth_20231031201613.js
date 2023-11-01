const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')
const basicAuth = require('basic-auth')
const config = require("../routes/config")


 const authMiddleware = (req,res,next) =>{
        
        const buf = Buffer.from(req.headers.authorization.substring(req.headers.authorization.indexOf(' ')+1), 'base64');
        const authString = buf.toString('ascii');
        const jwttoken = authString.split(':');
        if(!jwttoken || jwttoken.name === 'null') {
            res.send('无JWT')
            return
        }

        try{
            jwt.verify(jwttoken[0],jwtSecret)
            
        } catch(e) {

            if(e.name === 'TokenExpiredError'){
                res.send('jwt失效')
            }
            return
        }  

 
        next()

        
         
    }

   
    


module.exports = authMiddleware