const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")
//findAll ile filtereleme yaparken birden fazla data döndürür
//findByPk ile filtreleme yaparke sadece belli datayı döndürür



router.use("/blogs/category/:categoryId",userController.blogsByCategory )

router.use("/blogs/:id", userController.blogsDetails)

router.use("/blogs", userController.blogList)

router.use("/", userController.blogIndex)



module.exports = router