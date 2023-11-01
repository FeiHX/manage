const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
// const jwt = require('jsonwebtoken')
// const config = require("./config")
// const authMiddleware = require('../middlewares/auth')



router.get('/',(req,res) => {
    
    const sql = `select * from rolesrightsmenu`
    sqlFn(sql,[],function(data) {
        // console.log(data);
        res.send(data)
    })

})
router.delete('/',(req,res)=>{
    console.log(req.query.id);
    const sql = "delete from user where `id` = ? "
    const arr = [req.query.id]
    sqlFn(sql,arr,function(){
        res.send('删除成功')
    })
})
module.exports = router;