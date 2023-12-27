const express = require("express")
const app = express()
var cors = require('cors')
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
/* app.use(express.json()) */
const userRoutes = require("./routes/user")
app.use(userRoutes)
app.use("/profile", express.static('./upload/images'))
/* app.use(express.json()) */




app.listen(3000, '192.168.1.109', () => {
    console.log("server")
})