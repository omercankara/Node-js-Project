const express = require("express")
const router = express.Router();


const bookPostController = require('../src/Controllers/bookController/postApi')
const bookGetController = require('../src/Controllers/bookController/getApi')

const categoryPostController = require("../src/Controllers/categoryController/postApi")
const categoryGetController = require("../src/Controllers/categoryController/getApi")

const personPostController = require("../src/Controllers/personController/postApi")
const personGetController = require("../src/Controllers/personController/getApi")

const sendBookController = require('../src/Controllers/BookPersonController/postApi')
const sendGetBookController = require("../src/Controllers/BookPersonController/getApi")


const imageUpload = require("../helpers/image-upload")


router.post("/createBook", imageUpload.upload.single("image"), bookPostController.createBook)
router.post("/updateBook", imageUpload.upload.single("image"), bookPostController.updateBook)
router.post("/deleteBook", bookPostController.deleteBook)
router.get("/bookList", bookGetController.bookList)



router.post("/createCategory", categoryPostController.createCategory)
router.post("/updateCategory", categoryPostController.updateCategory)
router.get("/categoryList",    categoryGetController.categoryList)
router.post("/deleteCategory", categoryPostController.deleteCategory)



router.get("/personList",personGetController.personList)
router.post("/createPerson", personPostController.createPerson)
router.post("/updatePerson", personPostController.updatePerson)
router.post("/deletePerson", personPostController.deletePerson)


router.post("/createPersonBook",sendBookController.createPersonBook)
router.get("/sendBookList",sendGetBookController.sendBookList)
router.post("/deletePersonBook",sendBookController.deletePersonBook)






module.exports = router



