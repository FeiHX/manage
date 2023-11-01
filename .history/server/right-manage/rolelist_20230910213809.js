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
router.delete('')
module.exports = router;