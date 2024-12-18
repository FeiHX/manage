const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../routes/config')
const url = require('url')
const sqlFn = require("../mysql")
const express = require('express');
const router = express.Router();
const authMiddleware = (req,res,next) => {
    const {pathname} = url.parse(req.url);
    const {method} = req;
    if( (pathname === '/categories' && method === 'GET') ||
        (pathname === '/news/homepublish' && method === 'GET') ||
        (pathname === '/news/preview' && method === 'GET') ||
        (pathname === '/news/preview/view' && method === 'PATCH') ||
        (pathname === '/news/preview/star' && method === 'PATCH') ||
        (pathname === '/users' && method === 'POST') ||
        (pathname === '/users/otherlogin' && method === 'POST') ||
        (pathname === '/rolelist' && method === 'GET') ||
        (pathname === '/rightlist' && method === 'GET') ||
        (pathname === '/rightlistchildren' && method === 'GET')) {
            next()
        }else {
            if(!req.headers.authorization) {
                res.status(401).send('无JWT');
                return
            }
            const buf = Buffer.from(req.headers.authorization.substring(req.headers.authorization.indexOf(' ')+1), 'base64');
            const authString = buf.toString('ascii');
            const jwToken = authString.split(':');
            sqlFn("select * from authtoken where `jwToken`=?",[jwToken[0]],function(data) {
                data = JSON.parse(JSON.stringify(data))
                if(data.length==0) {
                    res.status(401).send('无效JWT')
                    return
                }
            })
            try{
                jwt.verify(jwToken[0],jwtSecret)
            }catch(e) {
                if(e.name === 'TokenExpiredError'){
                    res.status(401).send('JWT失效')
                return
                }
            }
            next()
        }
}

module.exports = authMiddleware

