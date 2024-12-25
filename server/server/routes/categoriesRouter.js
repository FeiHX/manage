const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware)

router.get('/categories',(req,res)=>{  
    const sql = "select * from categories  "
    const arr = [req.query]
    sqlFn(sql,arr,function(data) {
        res.send(data)
    })  
})
router.delete('/categories',(req,res)=>{
    const sql = "delete from categories where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
})
router.patch('/categories',(req,res)=>{
    const {title,value} = req.body;
    const {id} = req.query;
    const sql = "update  categories set `title`=? , `value`=? where `id`=?"
    const arr = [title,value,id-0]
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
})
router.post('/categories/restore',(req,res)=> {
    const sql1 = "delete from categories"
    const arr1 = []
    sqlFn(sql1,arr1,function(){
    })
    req.body.map(data => {
        let sql = "insert into categories (`id`,`title`,`value`) values (?,?,?)"
        let arr = [data.id,data.title,data.value]
        sqlFn(sql,arr,function(){

        })
    })
    res.send('初始化成功')
})
module.exports = router;
