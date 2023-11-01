const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")

router.get('/',(req,res)=>{
    console.log(req.query.publishState);
       
   const sql = "select * from categories  "
   const arr = [req.query]
   sqlFn(sql,arr,function(data) {
       console.log(data);
       res.send(data)
   })  

router.post('/',(req,res)=>{
     
        let {username,password,roleId,region,role,roleState,roleDefault} = req.body
        let sql = "insert into news (`username`,`password`,`roleId`,`region`,`role`,`roleState`,`roleDefault`) values (?,?,?,?,?,?,?)"
        let arr = [username,password,roleId,region,role,roleState,roleDefault]
        sqlFn(sql,arr,function(data) {
            // console.log(1111);
            if(data.affectedRows) {
                // console.log(data,111)
                res.send(data)
            }else{
                res.status(400).json(new Error('注册失败'))
            }
        })


})

          
   

})
module.exports = router;