const express = require("express")
const app = express()
var cors = require('cors')
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
const userRoutes = require('./routes/appRoutes');

app.use("/image", express.static('./upload/images'))
app.use(userRoutes)



const server = app.listen(8080, '192.168.1.144', () => {
    console.log("Server is running on 192.168.1.144:8080");
});