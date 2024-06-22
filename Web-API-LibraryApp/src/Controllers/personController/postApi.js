const express = require("express")
const router = express.Router()
const db = require("../../../database/database")



const createPerson = async (req, res) => {
    let { isim, soyisim, tc, telefon, adres, cinsiyet } = req.body
    console.log(isim, soyisim, tc, telefon, adres, cinsiyet);
    try {
        let result = await db.execute("INSERT INTO person  (isim,soyisim,tc,telefon,adres,cinsiyet) VALUES (?,?,?,?,?,?)", [isim, soyisim, tc, telefon, adres, cinsiyet])
        return res.status(200).json({ message: "Başarılı" })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Başarısız" })

    }
}


const updatePerson = async (req, res) => {
    let { id, isim, soyisim, tc, telefon, adres, cinsiyet } = req.body;
    console.log(req.body);

    try {
        let result = await db.execute("UPDATE person SET isim=?, soyisim=?, tc=?, telefon=?, adres=?, cinsiyet=? WHERE id=?", [isim, soyisim, tc, telefon, adres, cinsiyet, id]);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}


const deletePerson = async (req, res) => {
    let { id } = req.body;
    console.log(id);
    try {
        let result = await db.execute("DELETE FROM person WHERE id=?", [id]);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};


module.exports = {
    deletePerson,
    updatePerson,
    createPerson
}