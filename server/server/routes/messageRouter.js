const express = require('express');
const router = express.Router();
const expressWs = require('express-ws')(router)
const sqlFn = require("../mysql")

const wsMap = new Map()
const wsMap2 = new Map()
const private = (send,recieve) => {
    if(send < recieve) {
        return send + '<=>' +recieve
    }else {
        return recieve + '<=>' + send
    }
}

router.ws('/websocket/notice',function(ws,req) {
    const {type,send} = req.query;
    wsMap2.set(send,ws)
    switch (type) {
        case 'submit':
        case 'pass':
        case 'reject':
        case 'publish':
        case 'sunset':
        case 'delete':
            ws.on('message', function (msg) {
                let sql = "insert into notices (`message`) values (?)"
                let arr = [msg]

                sqlFn(sql,arr,function(data) { })
                const sql1 = "select * from notices"
                sqlFn(sql1,[],function(data) {
                    wsMap2.forEach((value,key,map)=>{
                        value.send(JSON.stringify(msg))
                    })
                })
            })
            break;
        case 'list':     
            const sql1 = "select * from notices"
            sqlFn(sql1,[],function(data) {
                ws.send(JSON.stringify(JSON.parse(JSON.stringify(data))))
            })
            break;
        default:
            ws.on('message',function() {
                ws.send('heartbeat-response')
            })
    }
})
router.ws('/websocket/chat',function(ws,req) {
    const {type,send,recieve} = req.query;
    const sqlCheck = "select * from userlist where `user`= ? "
    const arrCheck = [send]
    sqlFn(sqlCheck,arrCheck,function(data) {
        if(!data.length) {
            let sqlUser = "insert into userlist (`user`) values (?)"
            let arrUser = [send]
            sqlFn(sqlUser,arrUser,function(data) { })
        }
    })
    wsMap.set(send,ws)
    switch (type) {
        case 'chat':
            const privateName = private(send,recieve)
            ws.on('message', function (msg) {
                const sqlCheckMsg = "select * from privatemessage where `privateName`=?"
                const arrCheckMsg = [privateName]
                sqlFn(sqlCheckMsg,arrCheckMsg,function(data) {
                    if(!data.length) {                    
                        const sqlIncertMsg = "insert into privatemessage (`privateName`,`message`) values (?,?)"
                        const arrIncertMsg = [privateName,msg]
                        sqlFn(sqlIncertMsg,arrIncertMsg,function(data) {})
                    }else {
                        const sqlUpdateMsg = "update privatemessage set  `message`=?  where `privateName`=?"
                        const arrUpdateMsg = [JSON.parse(JSON.stringify(data))[0].message.concat(',,'+msg),privateName]
                        sqlFn(sqlUpdateMsg,arrUpdateMsg,function(data) {})
                    }
                    let sqlMsage = "select * from privatemessage where `privateName`=?"
                    let arrMsage = [privateName]
                    sqlFn(sqlMsage,arrMsage,function(data) { 
                        wsMap.get(JSON.parse(msg).recieve) && wsMap.get(JSON.parse(msg).recieve).send(JSON.parse(JSON.stringify(data))[0].message)
                    })
                })
            })
        break;
        case 'userlist':
            const sqlGetUser = "select * from userlist  "
            sqlFn(sqlGetUser,[],function(data) { 
                ws.send(JSON.stringify(data))
            })
        break;
        case 'messagelist':
            const privateName1 = private(send,recieve)
            let sqlMsage1 = "select * from privatemessage where `privateName`=?"
            let arrMsage1 = [privateName1]
                sqlFn(sqlMsage1,arrMsage1,function(data) {
                    if(data.length) {
                        ws.send(JSON.parse(JSON.stringify(data))[0].message)
                    } 
                })
        break;
    }
})

module.exports = router;


