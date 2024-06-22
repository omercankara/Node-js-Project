const express = require("express")
const router = express.Router()
const db = require("../../../database/database")


const personList = async (req, res) => {
    try {
        let result = await db.execute("SELECT * FROM person")
        res.json(result[0])
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    personList
}