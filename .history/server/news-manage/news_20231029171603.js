const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const jwt = require('jsonwebtoken')
const config = require("../routes/config")
const authMiddleware = require('../middlewares/auth')


router.patch('/update',(req,res)=>{
    // res.send('111')
    // const {id,roleState} = req.body;
    console.log(req.query);
    
    const sql = "update user set `roleState`=? where `id`=?"
    const arr =[roleState,id]
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
   
},)

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
       
   const sql = "select * from news where `author`= ? AND `auditState`= ?"
   const arr = [req.query.author,0]
   sqlFn(sql,arr,function(data) {
    //    console.log(data);
       res.send(data)
   })  
})
router.delete('/draft',(req,res)=>{
    // console.log(req.query.id,2222);
    const sql = "delete from news where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
    
})
router.get('/preview',(req,res)=>{
    console.log(req.query.id);
       
   const sql = "select * from news where `id`= ? "
   const arr = [req.query.id]
   sqlFn(sql,arr,function(data) {
    //    console.log(data);
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