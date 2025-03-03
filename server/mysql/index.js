const mysql = require("mysql");

let client = mysql.createConnection({
  host: "localhost",
  user: "13766422622Fhx",
  password: "13766422622Fhx",
  database: "reactlogin",
  port: "3306"
});
function sqlFn(sql, arr, callback) {
  client.query(sql, arr, function(error, result) {
    if (error) {
      console.log(new Error(error));
      return;
    }
    callback(result);
  });
}

module.exports = sqlFn;
