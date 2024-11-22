const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const cache = require('../middlewares/cache')

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware)

router.patch('/news/update/draft',(req,res)=>{
    const {title,subheading,categoryId,auditState,content} = req.body;
    const {id} = req.query;
    const sql = "update news set `title`=? , `subheading`=?,`categoryId`=? , `auditState`=? , `content`=?  where `id`=?"
    const arr =[title,subheading,categoryId,auditState,content,id-0]
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
})

router.patch('/news/update/publish',(req,res)=>{
    const {publishState,publishTime} = req.body;
    const {id} = req.query;
    const sql = "update news set `publishState`=?,`publishTime`=?  where `id`=?"
    const arr =[publishState,publishTime,id]
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
})
router.patch('/news/update/upload',(req,res)=>{
    const {auditState} = req.body;
    const {id} = req.query;
    const sql = "update news set `auditState`=? where `id`=?"
    const arr =[auditState,id]
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
})
router.delete('/news/update/delete',(req,res)=>{
    const sql = "delete from news where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
}) 
router.get('/news',(req,res)=>{  
    const sql = "select * from news where `publishState`= ? "
    const arr = [req.query.publishState]
    sqlFn(sql,arr,function(data) {
        cache(req,res,data)
    })  
})
router.get('/news/audit',(req,res)=>{    
    const sql = "select * from news where `auditState`= ? "
    const arr = [req.query.auditState]
    sqlFn(sql,arr,function(data) {
        let temp=JSON.parse(JSON.stringify(data));
        temp.forEach(item=>item.content='')
        res.send(temp)
    })  
})
router.get('/news/auditlist',(req,res)=>{
    const sql = "select * from news where `author`= ? AND (`auditState`=1 OR `auditState`=2 OR `auditState`=3) AND (`publishState`=0 OR `publishState`=1)"
    const arr = [req.query.author]
    sqlFn(sql,arr,function(data) {
        let temp=JSON.parse(JSON.stringify(data));
        temp.forEach(item=>item.content='')
        res.send(temp)
    })  
})
router.get('/news/draft',(req,res)=>{    
    const sql = "select * from news where `author`= ? AND `auditState`= ?"
    const arr = [req.query.author,0]
    sqlFn(sql,arr,function(data) {
        let temp=JSON.parse(JSON.stringify(data));
        temp.forEach(item=>item.content='')
        res.send(temp)
    })  
})
router.delete('/news/draft',(req,res)=>{
    const sql = "delete from news where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
})
router.get('/news/homepublish',(req,res)=>{
    const {publishState} = req.query;
    const sql = "select * from news where `publishState`= ?"
    const arr = [publishState]
    sqlFn(sql,arr,function(data){
        let temp=JSON.parse(JSON.stringify(data));
        temp.forEach(item=>item.content='')
        res.send(temp)
    })  
})
router.get('/news/preview',(req,res)=>{    
    const sql = "select * from news where `id`= ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(data) {
        cache(req,res,data)
    })  
})
router.patch('/news/preview/view',(req,res)=>{
    const {view} = req.body;
    const {id} = req.query;
    const sql = "update news set `view`=? where `id`=?"
    const arr =[view,id-0]
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
})
router.patch('/news/preview/star',(req,res)=>{
    const {star} = req.body;
    const {id} = req.query;
    const sql = "update news set `star`=? where `id`=?"
    const arr =[star,id-0]
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
})
router.get('/news/publishmanage',(req,res)=>{
    const {author,publishState} = req.query;
    const sql = "select * from news where `author`= ? AND `publishState`= ?"
    const arr = [author,publishState]
    sqlFn(sql,arr,function(data) {
        let temp=JSON.parse(JSON.stringify(data));
        temp.forEach(item=>item.content='')
        res.send(temp)    
    })  
})
router.post('/news',(req,res)=>{
	const {title,subheading,categoryId,content,region,author,roleId,auditState,publishState,createTime,star,view,publishTime} = req.body
    const sql = "insert into news (`title`,`subheading`,`categoryId`,`content`,`region`,`author`,`roleId`,`auditState`,`publishState`,`createTime`,`star`,`view`,`publishTime`) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const arr = [title,subheading,categoryId,content,region,author,roleId,auditState,publishState,createTime,star,view,publishTime];
	sqlFn(sql,arr,function(data) {
        res.send('成功')
    })
})
router.patch('/news/audit',(req,res)=>{
    const {auditState,publishState} = req.body;
    const {id} = req.query; 
    const sql = "update news set  `auditState`=? , `publishState`=? where `id`=?"
    const arr =[auditState,publishState,id-0]  
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    }) 
})

module.exports = router;
