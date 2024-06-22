const mysql = require("mysql2")
const config = require("../connect/config")


let connection = mysql.createConnection(config.database)
module.exports = connection.promise()