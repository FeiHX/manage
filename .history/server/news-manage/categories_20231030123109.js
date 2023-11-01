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
router.delete('/',(req,res)=>{
    const sql = "delete from categories where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
    
})
router.patch('/',(req,res)=>{

    const {title,value} = req.body;
    const {id} = req.query;
    
    const sql = "update news set  `auditState`=? , `publishState`=? where `id`=?"
    const arr =[auditState,publishState,id-0]
    // console.log(arr)
    sqlFn(sql,arr,function() {
        res.send('修改成功')
    })
   
},)


          
   

})
module.exports = router;