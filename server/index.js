const express = require('express');
const app = express();
const debug = require('debug')('my-application')
const bodyParser = require('body-parser')
const WebSocket = require('ws');
const path = require('path')
const authMiddleware = require('./middlewares/auth.js')
const users = require('./routes/userRouter.js')
const rolelist = require('./routes/rolelistRouter.js')
const rightlist = require('./routes/rightlistRouter.js')
const rightlistchildren = require('./routes/rightlistchildrenRouter.js')
const news = require('./routes/newsRouter.js')
const categories = require('./routes/categoriesRouter.js')
const authtoken = require('./routes/authTokenRouter.js')
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.json())
app.use(users);
app.use(rolelist)
app.use(rightlist)
app.use(rightlistchildren)
app.use(news)
app.use(categories)
app.use(authtoken)
app.listen(3030,(req,res) => {
    debug('服务器运行在3030端口上');
})