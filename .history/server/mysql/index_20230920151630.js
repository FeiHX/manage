const mysql = require("mysql")

let client = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"reactLogin"
})
function sqlFn(sql,arr,callback) {
    client.query(sql,arr,function(error,result){
        if(error) {
            console.log(new Error(error));
            return
        }
        callback(result)
    })
}

module.exports = sqlFn