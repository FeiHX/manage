const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')
const basicAuth = require('basic-auth')

 const middleware = (req,res,next) =>{
        
         const jwt = basicAuth(req)
         console.log(jwt);
         next();
        }
    
   
    


module.exports = Auth