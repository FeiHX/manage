const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')
const basicAuth = require('basic-auth')
const config = require("../routes/config")

// const verifyToken = (token) => {
//     try{
//         jwt.verify(token,jwtSecret)
        
//     } catch(e) {
//         // console.log('error是',e);
//         // if(e.TokenExpiredError){

            
//         // }
//         res.send(new Error('jwt失效'))
//         }  
//         return
// }
 const authMiddleware = (req,res,next) =>{
        // console.log(req.headers.authorization)
        //  const jwt = basicAuth(req)
        //  console.log(jwt);
        // console.log(req.headers.authorization)
        // const jwt = basicAuth(req)
        // console.log(jwt);

        console.log(req.headers.authorization);
        const buf = Buffer.from(req.headers.authorization.substring(req.headers.authorization.indexOf(' ')+1), 'base64');
        const authString = buf.toString('ascii');
        const jwt = authString.split(':');
        console.log(jwt);

      
        try{
             jwt.verify(jwt[0],jwtSecret)
            
        } catch(e) {
            console.log('error是',e);
            // if(e.TokenExpiredError){
    
                
            // }
            res.send(new Error('jwt失效'))
            return
            }  
            
        console.log(decoded);
        next()
        // if(!jwt) {
        //     res.send(new Error('jwt获取失败'))
        // }
        // try {
        //     let decoded = jwt.verify(jwt,jwtSecret)
        //     next()
        // }catch(e) {
        //     res.send(new Error('jwt失效'))
        // } 
        
         
    }

   
    


module.exports = authMiddleware