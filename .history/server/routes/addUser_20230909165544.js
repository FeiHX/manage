const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const jwt = require('jsonwebtoken')
const config = require("./config")





router.post('/',(req,res)=>{
     
        //注册
            console.log(req.body);
            res.send('添加成功')
            let {username,password,roleId,region} = req.body
            let sql = "insert into user values (?,?,?,?)"
            let arr = [username,password,roleId,region]
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