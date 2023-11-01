const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")

router.get('/',(req,res)=>{
       
   const sql = "select * from categories  "
   const arr = [req.query]
   sqlFn(sql,arr,function(data) {
       console.log(data);
       res.send(data)
   })  
router.delete('/draft',(req,res)=>{
    // console.log(req.query.id,2222);
    const sql = "delete from news where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
    
})


          
   

})
module.exports = router;