const express = require("express")
const router = express.Router()
const db = require("../../../database/database")


const createCategory = async (req, res) => {
    let { Category } = req.body
    try {
        let result = await db.execute("INSERT INTO category  (Category) VALUES (?)", [Category])
        return res.status(200).json({ message: "Başarılı" })
    } catch (err) {
        return res.status(400).json({ message: "Başarısız" })
    }
}


const updateCategory = async (req, res) => {
    let { id, Category } = req.body;
    console.log(id)
    try {
        let result = await db.execute("UPDATE category SET Category=? WHERE id=?", [Category, id])
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message); 
    }
}

const deleteCategory = async (req, res) => {
    let id = req.body.id
    console.log(id)
    try {
        let result = await db.execute("DELETE FROM category where id=?", [id])
        res.sendStatus(200)
        console.log(id)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
}