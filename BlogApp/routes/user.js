const express = require("express")
const router = express.Router()
const data = require("../data/data")


router.use("/blogs/category/:categoryid", async function (req, res) {
    const id = req.params.categoryid
    try{
        const [blog,] = await data.execute("SELECT * FROM blog where categoryid=?", [id]) //categoryİd bilgisine göre olan verileri getir örneğin 1 olan veriler
        const [category, ] = await data.execute("SELECT * From category")
        res.render("users/blogs",{
            blogs:blog,
            categories:category,
            selectedCategories:id
        })
    }catch(err){
        console.log(err)
    }
})


router.use("/blogs/:blogid", async function (req, res) {
    try {
        const id = req.params.blogid;
        const [blog,] = await data.execute("SELECT * FROM blog where id=?", [id])
        if (blog[0]) {
            res.render("users/blogDetails", {
                blog: blog[0],
                selectedCategories:null
            })
        } else {
            res.redirect("/")
        }
    } catch (err) {
        console.log(err);
    }

})


router.use("/blogs", async function (req, res) {
    try {
        const [blogs,] = await data.execute("SELECT * FROM blog where onay=1")
        const [category,] = await data.execute("SELECT * FROM category")
        res.render("users/blogs", {
            blogs: blogs,
            categories: category,
            selectedCategories:null
        })
    } catch (err) {
        console.log(err);
    }

})


router.use("/", async function (req, res) {
    try {
        const [blogs,] = await data.execute("SELECT * FROM blog where onay=1 AND anasayfa=1")
        const [category,] = await data.execute("SELECT * FROM category")
        res.render("users/index", {
            blogs: blogs,
            categories: category,
            selectedCategories:null
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router