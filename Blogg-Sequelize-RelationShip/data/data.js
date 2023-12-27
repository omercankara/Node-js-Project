const mysql = require("mysql2")
const config = require("../config")
const Sequelize = require("sequelize")
const sequelize  = new Sequelize(config.db.database, config.db.user, config.db.password,{
    dialect: "mysql",
    host:config.db.host
})

async function connect(){
    try{
        await sequelize.authenticate()
        console.log("Servera bağlandim");
    }catch(err){
        console.log(err);
    }
}
connect()
module.exports = sequelize











//let connection = mysql.createConnection(config.db)
// connection.connect(function (err) {
//     if (err) {
//         return console.log(err);
//     } else {
//         connection.query("SELECT * FROM blog", function (err, result) {
//             //console.log(result)
//         })
//     }
// })

// //promsise olarak gönderip then ve catch ile datayı yakalayacağız.
// module.exports = connection.promise()