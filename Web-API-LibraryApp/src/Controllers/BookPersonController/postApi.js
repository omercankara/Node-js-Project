const express = require("express")
const router = express.Router()
const db = require("../../../database/database")

const createPersonBook = async (req, res) => {
    let { bookId, personId, person_name, person_tc, book_name } = req.body
    console.log(req.body);
    try {
        let result = await db.execute("INSERT INTO booksend (book_id, person_id,person_name,person_tc,book_name) VALUES (?,?,?,?,?)", [bookId, personId, person_name, person_tc, book_name])
        return res.status(200).json(result[0])
    } catch (err) {
        console.log(err);
    }
}

const deletePersonBook = async (req, res) => {
    let { id } = req.body
    try {
        let result = await db.execute("DELETE from booksend where id=?", [id])
        return res.status(200).json(result[0])
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    createPersonBook,
    deletePersonBook
}