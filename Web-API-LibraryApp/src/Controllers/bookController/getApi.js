const express = require("express")
const router = express.Router()
const db = require("../../../database/database")

const bookList = async (req, res) => {
    try {
        let result = await db.execute("SELECT * FROM book ")
        res.json(result[0])
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    bookList
}