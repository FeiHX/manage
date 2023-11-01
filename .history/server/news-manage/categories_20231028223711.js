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




})

          
   

})
module.exports = router;