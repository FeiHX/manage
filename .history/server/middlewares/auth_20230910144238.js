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
        const jwt = basicAuth(req)
        console.log(jwt);

        console.info(req.headers.authorization);
        const buf = Buffer.from(req.headers.authorization.substring(req.headers.authorization.indexOf(' ')+1), 'base64');
        const authString = buf.toString('ascii');
        const basicauth = authString.split(':');
        console.info(basicauth);
      ————————————————
      版权声明：本文为CSDN博主「Andy____Li」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
      原文链接：https://blog.csdn.net/m0_37263637/article/details/103315677
        return res.send('11')
         
    }

   
    


module.exports = authMiddleware