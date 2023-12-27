const express = require("express")
const router = express.Router()
const fs = require("fs")
const data = require("../data/data")
const path = require("path")
const imageUpload = require("../helpers/image-upload")




//Blog Detaylay GET
router.get("/admin/blogs/:blogid", async (req, res) => {
    const blogid = req.params.blogid
    try {
        const [blogs,] = await data.execute("SELECT * From blog where id=?", [blogid])
        const [category,] = await data.execute("SELECT * FROM category")
        const blog = blogs[0]
        if (blog) {
            return res.render("admin/edit", {
                category: category,
                blog: blog
            })
        } else {
            res.redirect("/")
        }
    } catch (err) {
        console.log(err);
    }

})

//Blog detay POST (UPDATE)
router.post("/admin/blogs/:blogid",  imageUpload.upload.single("resim"), async (req, res) => {
    const blogid = req.body.blogid
    const baslik = req.body.baslik
    const aciklama = req.body.aciklama
    const altbaslik = req.body.altbaslik
    let resim = req.body.resim
    if(req.file){
            resim = req.file.filename
           fs.unlink("./public/images/" + req.body.resim, err => {
                console.log(err);
            }) 
    } 
    const onay = req.body.onay == "on" ? 1 : 0
    const anasayfa = req.body.anasayfa == "on" ? 1 : 0
    const kategoriid = req.body.kategori
 
    try {
        await data.execute("UPDATE blog SET title=?, Content=?, altbaslik=?, images=?,onay=?,anasayfa=?,categoryid=? WHERE id=?", [baslik, aciklama, altbaslik, resim, onay, anasayfa, kategoriid, blogid])
        res.redirect("/admin/blogs?action=edit")
    } catch (err) {
        console.log(err);
    }
})


//Blog Liste GET
router.get("/admin/blogs", async (req, res) => {
    try {
        const [blogs] = await data.execute("SELECT id,title,images,altbaslik from blog")
        res.render("admin/list", {
            blogs: blogs,
            action: req.query.action
        })
    } catch (err) {
        console.log(err);
    }
})



//Kateogori Bilgileri GET (Blog create işleminde kategori inputu için bilgileri çek()
// Sayfaya istek atıldığı zaman admin içerisindeki create sayfasını res.render ile getir
router.get("/blogs/create", async function (req, res) {
    try {
        const [category,] = await data.execute("SELECT * FROM category")
        res.render("admin/create", {
            category: category,
        })
    } catch (err) {
        console.log(err)
    }
})

const multer = require("multer")
const upload = multer({dest:"./public/images"});


//Blog Create POST (get ile getirilen admin/create sayfasından post atılacağı zaman yapılacak işlemleirm )
router.post("/blogs/create", imageUpload.upload.single("resim"), async function (req, res) {
    const baslik = req.body.baslik
    const aciklama = req.body.aciklama
    const altbaslik = req.body.altbaslik
    const resim = req.file.filename
    const onay = req.body.onay == "on" ? 1 : 0
    const anasayfa = req.body.anasayfa == "on" ? 1 : 0
    const kategori = req.body.kategori
    console.log(req.body);
    try {
        console.log(resim);
         await data.execute("INSERT INTO blog(title,Content,altbaslik,images,onay,anasayfa,categoryid) VALUES (?,?,?,?,?,?,?)",
            [baslik, aciklama, altbaslik, resim, onay, anasayfa, kategori,]) 
        res.redirect("/admin/blogs?action=create")
    } catch (err) {
        console.log(err);
    }
})


//Get Deleted DATA
//istek atıldığı zaman blogDelete sayfasını getir
router.get("/blogs/delete/:blogid", async (req, res) => {
    const blogid = req.params.blogid
    console.log(blogid)
    try {
        const [blogs,] = await data.execute("SELECT * from blog  where id=?", [blogid]);
        const blog = blogs[0]
        res.render("admin/blogDelete", {
            blog: blog
        })
         res.redirect("admin/list")
    } catch (err) {

    }
})

// post deleted data
// get ile getirilen blog delete sayfasının post işlemi
router.post("/blogs/delete/:blogid", async (req, res) => {
    const blogid = req.body.blogid
    fs.unlink("./public/images/" + req.body.resim,  err => {
        console.log(err);
    })
    try {
        await data.execute("delete from blog where id=?", [blogid])
        res.redirect("/admin/blogs?action=delete")
        
    } catch (err) {
        console.log(err);
    }
})


//Get Categories (kategori bilgilerini çek ve category sayfasına gönder)
router.get("/category", async (req, res) => {

    try {
        const [categories,] = await data.execute("Select * from category")

        res.render("admin/category", {
            action: req.query.action,
            category: categories
        })
    } catch (err) {
        console.log(err);
    }
})


//İstek at ve render ile create sayfasını çek
router.get("/admin/category/create", async (req, res) => {

    try {
        res.render("admin/categoryCreate", {})
    } catch (err) {
        console.log(err);
    }
})

//çekilen sayfada post işlemini yap
router.post("/admin/category/create", async (req, res) => {
    const name = req.body.categoryName
    try {
        await data.execute("INSERT INTO category(name) VALUES(?)", [name])
        res.redirect("/category?action=create")
    } catch (err) {
        console.log(err);
    }
})



//UPDATE İŞLEMİ - İstek at sayfayı çek ve ilgili bilgileri sayfaya gönder
router.get("/admin/category/:categoryid", async (req, res) => {
    const categoryid = req.params.categoryid
    try {
        const [categories,] = await data.execute("SELECT * FROM category where id=?", [categoryid])
        const category = categories[0]
        if (category) {
            return res.render("admin/categoryEdit", {
                category: category,

            })
        } else {
            res.redirect("admin/category")
        }
    } catch (err) {
        console.log(err);
    }

})


//UPDATE POST İŞLEMİ
router.post("/admin/category/:categoryid", async (req, res) => {
    const categoryName = req.body.categoryName
    const id = req.body.categoryid
    try {
        await data.execute("UPDATE category SET name=? WHERE id=?", [categoryName, id])

        res.redirect("/category?action=edit")
    } catch (err) {
        console.log(err);
    }

})



//ilgili sayfaya istek at render ile sayfayı çek ve ilgili idli bilgiyi sayfaya bas
router.get("/admin/category/delete/:categoryid", async (req, res) => {
    const categoryid = req.params.categoryid;
    try {
        const [categories,] = await data.execute("SELECT * FROM category WHERE id=?", [categoryid])
        const category = categories[0]
        res.render("admin/categoryDelete", {
            category: category
        })
    } catch (err) {
        console.log(err);
    }
})

//yakalanan sayfada post işlemi ile ilgili datayı form içinde yakala ve sil
router.post("/admin/category/delete/:categoryid", async (req, res) => {
    const id = req.body.categoryid
    try {
        await data.execute("DELETE FROM category WHERE id=?", [id])
        res.redirect("/category?action=delete")
    } catch (err) {
        console.log(err);
    }
})



module.exports = router