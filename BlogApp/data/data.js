const mysql = require("mysql2")
const config = require("../config")
let connection = mysql.createConnection(config.db)

connection.connect(function (err) {
    if (err) {
        return console.log(err);
    } else {
        connection.query("SELECT * FROM blog", function (err, result) {
            //console.log(result)
        })
    }
})

//promsise olarak gönderip then ve catch ile datayı yakalayacağız.
module.exports = connection.promise()