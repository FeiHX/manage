const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const jwt = require('jsonwebtoken')
const config = require("./config")





router.post('/',(req,res)=>{
     
        //添加用户
            console.log(req.body);
            res.send('添加成功')
            let {username,password,roleId,region,role,roleState,roleDefault} = req.body
            let sql = "insert into user (`username`,`password`,roleId,region,role,roleState,roleDefault) values (?,?,?,?,?,?,?)"
            let arr = [username,password,roleId,region,role,roleState,roleDefault]
            sqlFn(sql,arr,function(data) {
                // console.log(1111);
                if(data.affectedRows) {
                    res.send({success:true})
                }else{
                    res.status(400).json(new Error('注册失败'))
                }
            })
    

})
   




module.exports = router;