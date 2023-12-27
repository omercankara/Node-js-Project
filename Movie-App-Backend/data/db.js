const mysql = require("mysql2")
const config = require("../databaseconnect/config")

let connection = mysql.createConnection(config.db)

connection.connect(function (err) {
  /*   if (err) {
        return console.log(err);
    }
    connection.query("select * from user", function (err, result) {
        console.log(result);
    }) */
})

module.exports = connection.promise()