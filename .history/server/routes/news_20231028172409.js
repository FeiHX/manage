const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const jwt = require('jsonwebtoken')
const config = require("./config")
const authMiddleware = require('../middlewares/auth')




router.get('/',(req,res)=>{
     console.log(req.query.publishState);
        
    const sql = "select * from news where `publishState`= ? "
    const arr = [req.query.publishState]
    sqlFn(sql,arr,function(data) {
        console.log(data);
        res.send(data)
    })  

           
    

})
router.post('/',(req,res)=>{
    // console.log(req.query);
   const sql = "select * from news where `id`= ? "
   const arr = [req.query.id]
   sqlFn(sql,arr,function(data) {
    //    console.log(data);
       res.send(data)
   })  

          
   

})

   




module.exports = router;