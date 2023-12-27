const express = require("express")
const app = express()
const path = require("path")
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")


app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false})) //req body den gelen dataları parse et post işlemi için 
app.use(express.static("node_modules"))
app.use("/static", express.static(path.join(__dirname, "public")))
app.use(adminRoutes)
app.use(userRoutes)




app.listen(3000, function () {
    console.log("Listening 3000");

})






