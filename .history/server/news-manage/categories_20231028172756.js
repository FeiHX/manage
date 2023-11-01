const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")

router.get('/',(req,res)=>{
    console.log(req.query.publishState);
       
   const sql = "select * from categories where `publishState`= ? "
   const arr = [req.query.publishState]
   sqlFn(sql,arr,function(data) {
       console.log(data);
       res.send(data)
   })  

          
   

})
module.exports = router;