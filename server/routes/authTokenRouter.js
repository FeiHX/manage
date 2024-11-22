const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")

const authMiddleware = require('../middlewares/auth')
router.use(authMiddleware)

router.delete('/authtoken',(req,res)=>{
    const sql = "delete from authtoken where `jwToken` = ? "
    const arr = [req.body.jwToken]
    sqlFn(sql,arr,function(){
        res.send('jwToken删除成功')
    })
})

module.exports = router;
