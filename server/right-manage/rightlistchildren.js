const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")




router.get('/',(req,res) => {
    
    const sql = `select * from rightsmenuchildren`
    sqlFn(sql,[],function(data) {
       
        res.send(data)
    })

})
module.exports = router;