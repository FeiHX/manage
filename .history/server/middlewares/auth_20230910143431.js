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
        // console.log(req.headers.authorization)
        //  const jwt = basicAuth(req)
        //  console.log(jwt);
        // console.log(req.headers.authorization)
        const jwt = basicAuth(ctx.request)
        console.log(jwt);
        return res.send('11')
         
    }

   
    


module.exports = authMiddleware