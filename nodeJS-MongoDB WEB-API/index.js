const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const apiRoutes = require("./routes/appRoutes.js");

dotenv.config();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());


app.use(apiRoutes)


// Connect to MongoDB
mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Database connection error:", err);
 });








