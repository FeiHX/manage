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
        if(!jwt) {
            res.send(new Error('jwt获取失败'))
        }
        try {
            let decoded = jwt.verify()
        }catch(2) res.send('11')
         
    }

   
    


module.exports = authMiddleware