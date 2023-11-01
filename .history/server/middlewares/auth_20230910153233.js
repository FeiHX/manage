const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')
const basicAuth = require('basic-auth')
const config = require("../routes/config")

const verifyToken = (token) => {
    try{
        jwt.verify(token,jwtSecret)
        return true
    } catch(e) {
        if(e.name === 'tokenExpiredError'){

            res.send(new Error(''))
        }
        }  
}
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

        let decoded = verifyToken(jwt)
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