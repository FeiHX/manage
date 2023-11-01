const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")



router.get('/',(req,res) => {
    
    const sql = `select * from rightsmenu`
    sqlFn(sql,[],function(data) {
        console.log(data);
        res.send(data)
    })

})
module.exports = router;