const express = require("express")
const router = express.Router()
const db = require("../../../database/database")


const createBook = async (req, res) => {
    let { Baslik, Yazar, Yayinevi, Kategori, Dil, Sayfa } = req.body;
    let image = "http://192.168.1.144:8080/image/" + req.file.filename;
    //console.log(req.body);

    try {
        let result = await db.execute("INSERT INTO book (Baslik, Yazar, Yayinevi, Kategori, Dil, Sayfa, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [Baslik, Yazar, Yayinevi, Kategori, Dil, Sayfa, image]
        );
        return res.status(200).json(result[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Başarısız" });
    }
};

const deleteBook = async (req, res) => {

    let id = req.body.id
    console.log(id)
    try {
        let result = await db.execute("DELETE FROM book where id=?", [id])
        res.sendStatus(200)
        console.log(id)
    } catch (err) {
        console.log(err)
    }
}

const updateBook = async (req, res) => {
    let { Baslik, Yazar, Yayinevi, Kategori, Dil, Sayfa, id } = req.body;
    let image = "http://192.168.1.144:8080/image/" + req.file.filename;
    console.log(image);

    try {
        let result = await db.execute("UPDATE book SET Baslik=?,Yazar=?,Yayinevi=?,Kategori=?,Dil=?,Sayfa=?,image=? WHERE id=?",
            [Baslik, Yazar, Yayinevi, Kategori, Dil, Sayfa, image, id]
        )
        res.sendStatus(200)
      
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    createBook,
    deleteBook,
    updateBook
}