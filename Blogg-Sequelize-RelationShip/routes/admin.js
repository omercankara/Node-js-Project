const express = require("express")
const router = express.Router()

const imageUpload = require("../helpers/image-upload")
const adminController = require("../controllers/admin")

//Blog Detaylay GET
router.get("/admin/blogs/:id", adminController.getAdmingBlogDetailList)

//Blog detay POST (UPDATE)
router.post("/admin/blogs/:id", imageUpload.upload.single("resim"), adminController.updateBlogPost)

//Blog Liste GET
router.get("/admin/blogs", adminController.getAdminBlogList)

//Kateogori Bilgileri GET (Blog create işleminde kategori inputu için bilgileri çek()
// Sayfaya istek atıldığı zaman admin içerisindeki create sayfasını res.render ile getir
router.get("/blogs/create", adminController.blogCreate)

const multer = require("multer")
const upload = multer({ dest: "./public/images" });


//Blog Create POST (get ile getirilen admin/create sayfasından post atılacağı zaman yapılacak işlemleirm )
router.post("/blogs/create", imageUpload.upload.single("resim"), adminController.blogPost)

//category edit içindeki blog datasını sil
router.post("/admin/category/remove",adminController.get_Category_Remove)

//Get Deleted DATA
//istek atıldığı zaman blogDelete sayfasını getir
router.get("/blogs/delete/:id", adminController.getBlogDeleteData)

// post deleted data
// get ile getirilen blog delete sayfasının post işlemi
router.post("/blogs/delete/:id", adminController.postBlogDeleteData)

//Get Categories (kategori bilgilerini çek ve category sayfasına gönder)
router.get("/category", adminController.getCategory)

//İstek at ve render ile Category create sayfasını çek
router.get("/admin/category/create",adminController.createCategory)

//çekilen sayfada post işlemini yap
router.post("/admin/category/create", adminController.postCreateCategory )

//UPDATE İŞLEMİ - İstek at sayfayı çek ve ilgili bilgileri sayfaya gönder
router.get("/admin/category/:categoryId",adminController.getEditCategoryData )

//UPDATE POST İŞLEMİ
router.post("/admin/category/:categoryId",adminController.postEditCategoryData)


//ilgili sayfaya istek at render ile sayfayı çek ve ilgili idli bilgiyi sayfaya bas
router.get("/admin/category/delete/:categoryId", adminController.getDeleteCategoryData )

//yakalanan sayfada post işlemi ile ilgili datayı form içinde yakala ve sil
router.post("/admin/category/delete/:categoryId", adminController.postDeleteCategoryData)


module.exports = router