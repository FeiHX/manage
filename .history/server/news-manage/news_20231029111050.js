const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const jwt = require('jsonwebtoken')
const config = require("../routes/config")
const authMiddleware = require('../middlewares/auth')




router.get('/',(req,res)=>{
     console.log(req.query.publishState);
        
    const sql = "select * from news where `publishState`= ? "
    const arr = [req.query.publishState]
    sqlFn(sql,arr,function(data) {
        // console.log(data);
        res.send(data)
    })  
})

router.get('/draft',(req,res)=>{
    console.log(req.query.author);
       
   const sql = "select * from news where `publishState`= ? "
   const arr = [req.query.publishState]
   sqlFn(sql,arr,function(data) {
       console.log(data);
       res.send(data)
   })  
})
router.post('/',(req,res)=>{
    console.log(res.body)
    // ...formInfo,
    // "content": content,
    // "region": props.region,
    // "author": props.username,
    // "roleId": props.roleId,
    // "auditState": auditState,
    // "publishState": 0,
    // "createTime": Date.now(),
    // "star": 0,
    // "view": 0,
        let {title,categoryId,content,region,author,roleId,auditState,publishState,createTime,star,view,} = req.body
        let sql = "insert into news (`title`,`categoryId`,`content`,`region`,`author`,`roleId`,`auditState`,`publishState`,`createTime`,`star`,`view`) values (?,?,?,?,?,?,?,?,?,?,?)"
        let arr = [title,categoryId,content,region,author,roleId,auditState,publishState,createTime,star,view]
        sqlFn(sql,arr,function(data) {
            // console.log(1111);
            if(data.affectedRows) {
                console.log(data,111)
                res.send(data)
            }else{
                res.status(400).json(new Error('注册失败'))
            }
        })

})

   




module.exports = router;