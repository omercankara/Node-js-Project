const express = require("express")
const app = express()
const path = require("path")
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false })) //req body den gelen dataları parse et post işlemi için 
app.use(express.static("node_modules"))
app.use("/static", express.static(path.join(__dirname, "public")))
app.use(adminRoutes)
app.use(userRoutes)

const sequelize = require("./data/data")
/* const dummyData = require("./data/dummy-data") */
const category = require("./models/category")
const blog = require("./models/blog")


//ilişkiler     
//1)One to Many
//1 kategori 1 den fazla bloğa sahip olacaktır.
// category.hasMany(blog,{
//     foreignKey:{
//         name:'categoryId',
//         allowNull:false //boş geçilemez
//     }
// }) 



blog.belongsToMany(category,{through:"blogCategories"}) // 1 blog 1den fazla  kategoriye ait olabilicektir (Teknolojii-Bilim gibi alanlara girebilir)
category.belongsToMany(blog,{through:"blogCategories"}) // 1 kategori 1 den fazla blog bilgilsine sahip olabilecektir.  

 
  



// Uygulanması - sync

//IIFE
// async function start() {
//     await sequelize.sync({ force: true })
//     /* await dummyData() */
// }
// start() 


app.listen(3000, function () {
    console.log("Listening 3000");

})






