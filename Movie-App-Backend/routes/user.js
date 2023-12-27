const express = require("express")
const router = express.Router()
const db = require("../data/db")
const imageUpload = require("../helpers/image-upload")
const fs = require('fs')





//****************ADD CONTROLLER*****************************

//Film Ekle
router.post("/addMovie", imageUpload.upload.single("profile"), async (req, res) => {
    let oyuncuid = req.body.oyuncuid
    let filmisim = req.body.filmisim
    let profile = "http://192.168.1.109:3000/profile/" + req.file.filename
    let vizyontarih = req.body.vizyontarih
    let ozet = req.body.ozet
    console.log(profile)
    console.log(filmisim)
    console.log(vizyontarih)
    console.log(ozet)
    try {
        let result = await db.execute("INSERT INTO movies (oyuncuid,filmisim,vizyontarih,ozet,profile) VALUES (?,?,?,?,?)", [oyuncuid, filmisim, vizyontarih, ozet, profile])
        res.sendStatus(200)

    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
})
//Actor ekle
router.post("/addActors", imageUpload.upload.single("profile"), async (req, res) => {
    let filmid = req.body.filmid
    let profile = "http://192.168.1.109:3000/profile/" + req.file.filename
    let name = req.body.name
    let yas = req.body.yas
    let dogumtarihi = req.body.dogumtarihi
    let gorev = req.body.gorev
    let biyografi = req.body.biyografi

    try {
        let result = await db.execute("INSERT oyuncular (filmid,profile,name,yas,dogumtarihi,gorev,biyografi) VALUES (?,?,?,?,?,?,?)", [filmid, profile, name, yas, dogumtarihi, gorev, biyografi])
        res.sendStatus(200) //Ok
    } catch (err) {
        res.sendStatus(500) //FAiled
        console.log(err)
    }
})
//Director ekle
router.post("/addDirector", imageUpload.upload.single("profile"), async (req, res) => {
    let filmid = req.body.filmid
    let name = req.body.name
    let yas = req.body.yas
    let biyografi = req.body.biyografi
    let gorev = req.body.gorev
    let filmler = req.body.filmler
    let foto = "http://192.168.1.109:3000/profile" + req.file.filename
    try {
        let result = await db.execute("INSERT INTO yonetmen (filmid,name,yas,biyografi,gorev,filmler,foto) VALUES (?,?,?,?,?,?,?)", [filmid, name, yas, biyografi, gorev, filmler, foto])
        res.sendStatus(200) //Ok
    } catch (err) {
        res.sendStatus(500) //FAiled
    }
})
//Yazar Ekle
router.post("/addWriter", imageUpload.upload.single("profile"), async (req, res) => {
    let filmid = req.body.filmid
    let name = req.body.name
    let yas = req.body.yas
    let biyografi = req.body.biyografi
    let gorev = req.body.gorev
    let filmler = req.body.filmler
    let foto = "http://192.168.1.109:3000/profile" + req.file.filename
    try {
        let result = await db.execute("INSERT INTO senarist (filmid,name,yas,biyografi,gorev,filmler,foto) VALUES (?,?,?,?,?,?,?)", [filmid, name, yas, biyografi, gorev, filmler, foto])
        res.sendStatus(200) //Ok
    } catch (err) {
        res.sendStatus(500) //FAiled
    }
})
//Fragman Ekle
router.post("/addFragman", async (req, res) => {
    let filmid = req.body.filmid
    let name = req.body.name
    console.log(req.body)
    try {
        let result = await db.execute("INSERT INTO fragman (filmid,name) VALUES (?,?)", [filmid, name])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
    }
})
//Film oyuncualrına mevcut oyunculardan ekle
router.post("/addPresentActorsMovie", async (req, res) => {
    let idoyuncu = req.body.idoyuncu
    let filmid = req.body.filmid
    try {
        let result = await db.execute("INSERT INTO filminoyunculari (idoyuncular,filmid) VALUES(?,?)", [idoyuncu, filmid])
        res.json(result[0])
    } catch (err) {
        console.log(err);
    }
})
//Oyuncuya Film Ekle
router.post("/oyuncufilmkaydet", async (req, res) => {
    let filmid = req.body.filmid
    let idoyuncu = req.body.oyuncuid
    console.log("filmid", filmid);
    console.log("idoyuncu", idoyuncu);
    try {
        let result = await db.execute("INSERT INTO oyuncufilm (idoyuncu,filmid) VALUES(?,?)", [idoyuncu, filmid])
        res.json(result[0])
    } catch (err) {
        console.log(err);
    }
})
//Oyuncuya fotoğraf Ekle
router.post("/addActorsPhoto/:idoyuncu", imageUpload.upload.single("profile"), async (req, res) => {
    let idoyuncu = req.params.idoyuncu
    let profile = "http://192.168.1.109:3000/profile/" + req.file.filename
    try {
        let result = await db.execute("INSERT INTO oyuncufoto (profile,idoyuncu) VALUES (?,?)", [profile, idoyuncu])
        console.log(result)

        res.json(result[0])
        res.status(200) //SUCCESS
    } catch (err) {
        console.log(err);
        res.status(500) //failure
    }
})




//*****************DELETE CONTROLLER*************************
router.post("/deleteMovie/:id", async (req, res) => {
    id = req.params.id
    try {
        let result = await db.execute("DELETE FROM movies WHERE id=?", [id])
        res.sendStatus(200)
        fs.unlink()
    } catch (err) {
        console.log(err)
    }

})

router.post("/deleteWriter/:id", async (req, res) => {
    id = req.params.id
    try {
        let result = await db.execute("DELETE FROM movies WHERE id=?", [id])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
    }

})

router.post("/deleteDirector/:id", async (req, res) => {
    id = req.params.id
    try {
        let result = await db.execute("DELETE FROM movies WHERE id=?", [id])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
    }

})

router.post("/deleteFragman/:id", async (req, res) => {
    id = req.params.id
    try {
        let result = await db.execute("DELETE FROM movies WHERE id=?", [id])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
    }

})

router.post("/deleteActors/:id", async (req, res) => {
    id = req.params.id
    try {
        let result = await db.execute("DELETE FROM movies WHERE id=?", [id])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
    }

})



//***********************GET CONTROLLER***********************************
//Tüm filmler
router.get("/movie", async (req, res) => {
    try {
        let result = await db.execute("SELECT * FROM movies")
        res.json(result[0])
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
})


//tüm oyuncular
router.get("/actors", async (req, res) => {
    try {
        let result = await db.execute("SELECT * FROM oyuncular")
        res.json(result[0])
    } catch (err) {
        console.log(err)
    }
})

//Filmin oyunculari tablosunu tamamen getir
router.get("/movieActorsTable", async (req, res) => {
    try {
        let result = await db.execute("SELECT * FROM filminoyunculari")
        res.json(result[0])
    } catch (err) {
        console.log(err);
    }
})

//filmin oyuncularinİ id ile seçerek getir
router.post("/movieActorsLoad", async (req, res) => {

    let id = []
    let data = req.body
    id.push(data)
    let idoyuncular = []
    id.forEach(element => {
        idoyuncular.push(element.id)
    });
    try {
        let result = await db.execute(`SELECT * FROM oyuncular WHERE id IN (${idoyuncular.join(",")})`);
        res.json(result[0])

    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }


    /* let result = await db.execute(`SELECT * FROM oyuncular WHERE id IN(${idoyuncular})`) */
    /* "SELECT * FROM oyuncular WHERE id)"+IN(idoyuncular) */

})

//idye göre film 
router.get("/movie/:movieId", async (req, res) => {
    let movieId = req.params.movieId
    try {
        let result = await db.execute("SELECT * FROM movies where id=?", [movieId])
        res.json(result[0])
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
})

//Seçilen Filmle göre oyuncuları getir
router.get("/movieActors/:id", async (req, res) => {
    let id = req.params.id
    try {
        let result = await db.execute("SELECT * FROM oyuncular where filmid=?", [id])
        res.json(result[0])
    } catch (err) {
        console.log(err)
    }
})




router.post("/actors/:actorId", async (req, res) => {
    let actorId = req.params.actorId
    try {
        let result = await db.execute("SELECT * FROM oyuncular where id=?", [actorId])
        res.json(result[0])
    } catch (err) {
        console.log(err)
    }
})


/* 
router.get("/actors/:actorId", async (req, res) => {
    let actorId = req.params.actorId
    try {
        let result = await db.execute("SELECT * FROM oyuncular where idoyuncular=?", [actorId])
        res.json(result[0])
    } catch (err) {
        console.log(err)
    }
}) */


router.get("/director/:id", async (req, res) => {
    let id = req.params.id
    try {
        let result = await db.execute("SELECT * FROM yonetmen where filmid=?", [id])
        res.json(result[0])

    } catch (err) {
        console.log(err)

    }
})
router.get("/writer/:id", async (req, res) => {
    let id = req.params.id
    try {
        let result = await db.execute("SELECT * FROM senarist where filmid=?", [id])
        res.json(result[0])

    } catch (err) {
        console.log(err)

    }
})
router.get("/fragman/:id", async (req, res) => {
    let id = req.params.id
    try {
        let result = await db.execute("SELECT * FROM fragman where filmid=?", [id])
        res.json(result[0])

    } catch (err) {
        console.log(err)

    }
})


router.post("/oyuncufilmleri", async (req, res) => {
    let id = req.body.id
    try {
        let result = await db.execute("select * from oyuncufilm where idoyuncu=?", [id])
        res.json(result[0])
    } catch (err) {
        console.log(err);
    }
})

router.post("/oyuncufilmbilgileri", async (req, res) => {
    let id = []
    let data = req.body
    id.push(data)
    let idoyuncular = []
    id.forEach(element => {
        idoyuncular.push(element.id)
    });

    try {
        let result = await db.execute(`SELECT * FROM movies WHERE id IN (${idoyuncular.join(",")})`);
        res.json(result[0])
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
})


router.post("/actorMultiPhoto/:idoyuncular", async (req, res) => {
    let idoyuncular = req.params.idoyuncular
    try {
        let result = await db.execute("SELECT * FROM oyuncufoto where idoyuncu=?", [idoyuncular])
        res.json(result[0])
    } catch (err) {
        console.log(err);
    }
})





router.get("/movieActors", async (req, res) => {
    try {
        let id = req.body.params
        let result = await db.execute("SELECT * from oyuncufilm ")
    } catch (err) {
        console.log(err);
    }
})

//*************************************************************************




module.exports = router 