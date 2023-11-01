const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const jwt = require('jsonwebtoken')
const config = require("../routes/config")
const authMiddleware = require('../middlewares/auth')


router.patch('/update/draft',(req,res)=>{
 
    const {title,categoryId,auditState,content} = req.body;
    const {id} = req.query;
    
    const sql = "update news set `title`=? , `categoryId`=? , `auditState`=? , `content`=?, where `id`=?"
    const arr =[title,categoryId,auditState,content,id-0]
    // console.log(arr)
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
   
},)
router.patch('/update/publish',(req,res)=>{

    
    const {publishState,publishTime} = req.body;
    const {id} = req.query;
    
    const sql = "update news set `publishState`=?,`publishTime`=?  where `id`=?"
    const arr =[publishState,publishTime,id-0]

    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
   
},)
router.patch('/update/upload',(req,res)=>{

    const {auditState} = req.body;
    const {id} = req.query;
    
    const sql = "update news set `auditState`=? where `id`=?"
    const arr =[auditState,id-0]

    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
   
},)
router.delete('/update/delete',(req,res)=>{

    const sql = "delete from news where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
    
})
router.get('/',(req,res)=>{
  
        
    const sql = "select * from news where `publishState`= ? "
    const arr = [req.query.publishState]
    sqlFn(sql,arr,function(data) {
       
        res.send(data)
    })  
})
router.get('/audit',(req,res)=>{
   
       
   const sql = "select * from news where `auditState`= ? "
   const arr = [req.query.auditState]
   sqlFn(sql,arr,function(data) {
       
       res.send(data)
   })  
})
router.get('/auditlist',(req,res)=>{
   
   const sql = "select * from news where `author`= ? AND (`auditState`=1 OR `auditState`=2 OR `auditState`=3) AND (`publishState`=0 OR `publishState`=1)"
   const arr = [req.query.author]
   sqlFn(sql,arr,function(data) {
       
       res.send(data)
   })  
})

router.get('/draft',(req,res)=>{
    
       
   const sql = "select * from news where `author`= ? AND `auditState`= ?"
   const arr = [req.query.author,0]
   sqlFn(sql,arr,function(data) {
  
       res.send(data)
   })  
})
router.delete('/draft',(req,res)=>{
    
    const sql = "delete from news where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
    
})
router.get('/preview',(req,res)=>{
   
       
   const sql = "select * from news where `id`= ? "
   const arr = [req.query.id]
   sqlFn(sql,arr,function(data) {
    
       res.send(data)
   })  
})
router.get('/publishmanage',(req,res)=>{
   
   const {author,publishState} = req.query;
   const sql = "select * from news where `author`= ? AND `publishState`= ?"
   const arr = [author,publishState]
   sqlFn(sql,arr,function(data) {
    
       res.send(data)
   })  
})

router.post('/',(req,res)=>{
   
        let {title,categoryId,content,region,author,roleId,auditState,publishState,createTime,star,view,} = req.body
        let sql = "insert into news (`title`,`categoryId`,`content`,`region`,`author`,`roleId`,`auditState`,`publishState`,`createTime`,`star`,`view`) values (?,?,?,?,?,?,?,?,?,?,?)"
        let arr = [title,categoryId,content,region,author,roleId,auditState,publishState,createTime,star,view]
        sqlFn(sql,arr,function(data) {
           
            if(data.affectedRows) {
                
                res.send(data)
            }else{
                res.status(400).json(new Error('注册失败'))
            }
        })

})
router.patch('/audit',(req,res)=>{
    
    const {auditState,publishState} = req.body;
    const {id} = req.query;
    
    const sql = "update news set  `auditState`=? , `publishState`=? where `id`=?"
    const arr =[auditState,publishState,id-0]
   
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
   
},)
   
router.get('/homepublish',(req,res)=>{
    // console.log(req.query.publishState);
   const {publishState} = req.query;
   const sql = "select * from news where `publishState`= ?"
   const arr = [publishState]
   sqlFn(sql,arr,function(data) {
    //    console.log(data);
       res.send(data)
   })  
})



module.exports = router;