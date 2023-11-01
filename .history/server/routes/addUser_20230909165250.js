const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const jwt = require('jsonwebtoken')
const config = require("./config")


router.get('/',(req,res) => {
    
    const sql = `select * from user`
    sqlFn(sql,[],function(data) {
        // console.log(data);
        res.send(data)
    })

})
router.delete('/',(req,res)=>{
    console.log(req.query.id,2222);
    const sql = "delete from user where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
    
})

// router.patch('/',(req,res,next)=>{
//     // res.send('111')
//     // const {id,roleState} = req.body;
//     console.log(req.body);
//     const {id,roleState} = req.body;
//     const sql = "update user set `roleState`=? where `id`=?"
//     const arr =[roleState,id]
//     sqlFn(sql,arr,function() {
//         res.send('修改成功')
//     })
//     next()
// },function(req,res){
//     console.log(req.body,111);
//     console.log(req.query.id,111211);
//     const {username,password,region,roleId} = req.body
//     const sql = "update user set `username`=? AND  `password`=?  AND  `region`=?  AND `roleId`=? where `id`=?"
//     const arr = [username,password,region,roleId,req.query.id];
//     sqlFn(sql,arr,function(){
//         res.send('更新成功')
//     })
// })
router.patch('/',(req,res)=>{
    // res.send('111')
    // const {id,roleState} = req.body;
    console.log(req.body);
    const {id,roleState} = req.body;
    const sql = "update user set `roleState`=? where `id`=?"
    const arr =[roleState,id]
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
   
},)
router.put('/',(req,res)=>{
    console.log(req.body,111);
    console.log(req.query.id,111211);
    const {username,password,region,roleId} = req.body
    const sql = "update user set `username`=?  , `password`=?  ,  `region`=?  , `roleId`=? where `id`=?"
    const arr = [username,password,region,roleId,req.query.id];
    sqlFn(sql,arr,function(){
        res.send('更新成功')
    })
})
router.post('/',(req,res) => {
    let {requestTpye} = req.body;
   
        console.log(req.body);
        const {username,password} = req.body;
        const sql = "select * from user where `username`=? AND `password`=?"
        const arr = [username,password];
        sqlFn(sql,arr,function(data) {
            if(data.length>0) {
                // res.json({success:true})
                console.log(data);
                const token = jwt.sign({
                    id:data[0].id,
                    username:data[0].username,
                    roleId:data[0].roleId,
                    region:data[0].region,
                    role:data[0].role
                },config.jwtSecret)
                res.send(token)
            }else{
                res.status(400).json(new Error('用户名或者密码错误'))
                }
            })
        
})  


// router.postForm('/',(req,res)=>{
     
//         //注册
//             console.log(req.body);
//             res.send('添加成功')
//             let {username,password,roleId,region} = req.body
//             let sql = "insert into user values (?,?,?,?)"
//             let arr = [username,password,roleId,region]
//             sqlFn(sql,arr,function(data) {
//                 // console.log(1111);
//                 if(data.affectedRows) {
//                     res.send({success:true})
//                 }else{
//                     res.status(400).json(new Error('注册失败'))
//                 }
//             })
    

// })
   




module.exports = router;