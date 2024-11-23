const express = require('express');
const router = express.Router();
const sqlFn = require("../mysql")
const multiparty = require('multiparty')
const path = require('path')

const uploadDir=`${__dirname}/upload`
const parentDir = path.join (__dirname, '/..'); 
const parentDir1 = path.join(parentDir,'public/upload/')
const multiparty_upload = function multiparty_upload(req, auto) {
    typeof auto !=="boolean"? auto = false : null;
    let config = {
        maxFieldsSize:200*1024*1024,
        };
    if(auto){config.uploadDir =parentDir1};
    return new Promise(async(resolve,reject) => {
        // await delay();
        new multiparty.Form(config)
            .parse(req,(err,fields,files) => {
                console.log(fields)
                console.log(parentDir)
                if(err) {reject(err);return;}
                resolve({fields,files});
            });
        });
}
    router.post('/files',async (req,res)=>{
            console.log(parentDir)
            let {files} = await multiparty_upload(req, true)
            let file =(files.file && files.file[0])||{};
            console.log(files)
            res.send({
                code: 0,
                codeText:'upload success',
                originalFilename:file.originalFilename,
                fileLink: 'api/'+file.path.split('/upload/')[1]

            })
})




 

    




module.exports = router;