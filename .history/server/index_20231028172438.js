const express = require('express');
const app = express();
const users = require('./routes/users')
const addUser = require('./routes/addUser')
const debug = require('debug')('my-application')
const bodyParser = require('body-parser')
const rolelist = require('./right-manage/rolelist')
const rightlist = require('./right-manage/rightlist')
const rightlistchildren = require('./right-manage/rightlistchildren')
const news = require('./routes/news')

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('客户端已连接');

  // 当有新的新闻时，通过WebSocket发送给客户端
  const news = '这是一条临时突发新闻';
  socket.send(news);
});


app.use(bodyParser.json())
app.use('/users',users);
app.use('/adduser',addUser)
app.use('/rolelist',rolelist)
app.use('/rightlist',rightlist)
app.use('/rightlistchildren',rightlistchildren)
app.use('/news',news)
app.use('/categories',categories)
// app.get('/',(req,res)=>{
//     res.send({
//         msg:'hello1122111'
//     })
    // console.log(req.body);
// });
// app.patch('/api/users',(res,req)=>{
//     console.log(req.body);
// })
app.listen(3030,(req,res) => {
    debug('服务器运行在3030端口上');
})