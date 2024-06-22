const express = require("express")
const router = express.Router()
const db = require("../../../database/database")




const sendBookList = async (req, res) => {
    try{
        let result = await db.execute("Select * from bookSend")
        res.json(result[0])
    }catch(err){
        console.log(err);
    }


    // let personId = 1
    // let bookId = 2
    // try {
    //     let result = await db.execute("SELECT person.isim, person.soyisim, person.tc, book.baslik FROM Person INNER JOIN book ON person.id = ? AND book.id = ?",[personId,bookId])
    //     res.json(result[0]);
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({ error: 'Database error' });
    // }

    //     try {
    //         let result = await db.execute("SELECT * FROM Person INNER JOIN book ON person.id = book.id");
    //         res.json(result[0]);
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ error: 'Database error' });
    //     }
    // }


}



module.exports = {
    sendBookList
}
