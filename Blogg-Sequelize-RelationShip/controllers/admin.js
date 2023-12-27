const blog = require("../models/blog")
const category = require("../models/category")
const fs = require("fs")
const { Op } = require("sequelize")
const sequelize = require("../data/data")


//Blog Edit işlemi için get Sorgusu
module.exports.getAdmingBlogDetailList = async (req, res) => {
    const blogid = req.params.id
    try {
        /*   const blogs = await blog.findByPk(blogid) */
        const blogs = await blog.findOne({
            where: {
                id: blogid
            },
            include: {
                model: category,
                attributes: ["id"]
            }
        })
        const categories = await category.findAll()
        if (blogs) {
            return res.render("admin/edit", {
                category: categories,
                blogs: blogs
            })
        } else {
            res.redirect("/blogs")
        }
    } catch (err) {
        console.log(err);
    }

}

// Post Data Blog Edite Page
module.exports.updateBlogPost = async (req, res) => {
    const blogid = req.body.id
    const baslik = req.body.baslik
    const aciklama = req.body.aciklama
    const kategoriIds = req.body.categories
    const altbaslik = req.body.altbaslik
    let resim = req.body.resim
    if (req.file) {
        resim = req.file.filename
        fs.unlink("./public/images/" + req.body.resim, err => {
            console.log(err);
        })
    }
    const onay = req.body.onay == "on" ? 1 : 0
    const anasayfa = req.body.anasayfa == "on" ? 1 : 0
    const kategoriid = req.body.kategori

    try {
        // await data.execute("UPDATE blog SET title=?, Content=?, altbaslik=?, images=?,onay=?,anasayfa=?,categoryid=? WHERE id=?", [baslik, aciklama, altbaslik, resim, onay, anasayfa, kategoriid, blogid])
        const blogs = await blog.findOne({
            where: {
                id: blogid
            },
            include: {
                model: category,
                attributes: ["id"]
            }
        })

        if (blogs) {
            blogs.title = baslik
            blogs.Content = aciklama
            blogs.altbaslik = altbaslik
            blogs.onay = onay
            blogs.anasayfa = anasayfa
            blogs.resim = resim
            if (kategoriIds == undefined) {
                await blogs.removeCategories(blogs.categories)
            } else {
                await blogs.removeCategories(blogs.categories)
                const selectedCategories = await category.findAll({
                    where: {
                        id: {
                            [Op.in]: kategoriIds
                        }
                    }
                });
                await blogs.addCategories(selectedCategories)
            }



            await blogs.save()
            return res.redirect("/admin/blogs?action=edit")
        }
        res.redirect("/admin/blogs")

    } catch (err) {
        console.log(err);
    }
}

//Get Admin Blog List
module.exports.getAdminBlogList = async (req, res) => {
    try {
        //const [blogs] = await data.execute("SELECT id,title,images,altbaslik from blog")
        const blogs = await blog.findAll(
            {
                attribute: ["id", "title", "resim", "altbaslik"],
                include: category
            })
        //console.log(blogs);
        res.render("admin/list", {
            blogs: blogs,
            action: req.query.action
        })


    } catch (err) {
        console.log(err);
    }
}

//Kateogori Bilgileri GET (Blog create işleminde kategori inputu için bilgileri çek()
// Sayfaya istek atıldığı zaman admin içerisindeki create sayfasını res.render ile getir
module.exports.blogCreate = async function (req, res) {
    try {
        const categories = await category.findAll()
        res.render("admin/create", {
            categories: categories,
        })
    } catch (err) {
        console.log(err)
    }
},
    //getirilen sayfada post işlemini gerçekleştir
module.exports.blogPost = async function (req, res) {
        const baslik = req.body.baslik
        const aciklama = req.body.aciklama
        const altbaslik = req.body.altbaslik
        const resim = req.file.filename
        const anasayfa = req.body.anasayfa == "on" ? 1 : 0
        const onay = req.body.onay == "on" ? 1 : 0
        const kategori = req.body.kategori
        try {
            blog.create({
                title: baslik,
                Content: aciklama,
                altbaslik: altbaslik,
                resim: resim,
                anasayfa: anasayfa,
                onay: onay,
                categoryId: kategori
            })

            res.redirect("/admin/blogs?action=create")
        } catch (err) {
            console.log(err);
        }
}

module.exports.getBlogDeleteData = async (req, res) => {
    const blogid = req.params.id
    console.log(blogid)
    try {

        const blogs = await blog.findByPk(blogid)
        if (blogs) {
            return res.render("admin/blogDelete", {
                blog: blogs
            })
        }

        res.redirect("admin/list")
    } catch (err) {

    }
}

module.exports.postBlogDeleteData = async (req, res) => {
    const blogid = req.body.id
    fs.unlink("./public/images/" + req.body.resim, err => {
        console.log(err);
    })
    try {
        const blogs = await blog.findByPk(blogid)
        if (blogs) {
            await blogs.destroy()
            return res.redirect("/admin/blogs?action=delete")
        }
        res.redirect("admin/blogs")


    } catch (err) {
        console.log(err);
    }
}

module.exports.getCategory = async (req, res) => {
    try {
        const categories = await category.findAll()
         res.render("admin/category", {
            action: req.query.action,
            category: categories
        }) 
        // res.json(categories)
    } catch (err) {
        console.log(err);
    }
}

module.exports.createCategory = async (req, res) => {
    try {
        res.render("admin/categoryCreate", {})
    } catch (err) {
        console.log(err);
    }
}

module.exports.postCreateCategory = async (req, res) => {
    const name = req.body.categoryName
    try {
        await category.create({ name: name })
        res.redirect("/category?action=create")
    } catch (err) {
        console.log(err);
    }
}

module.exports.getEditCategoryData = async (req, res) => {
    const categoryid = req.params.categoryId
    try {
        /* const [categories,] = await data.execute("SELECT * FROM category where id=?", [categoryid]) */
        const categories = await category.findByPk(categoryid)
        const blogs = await categories.getBlogs()
        const countBlog = await categories.countBlogs()


        if (categories) {
            return res.render("admin/categoryEdit", {
                category: categories.dataValues,
                blogs: blogs,
                countBlog: countBlog
            })
        } else {
            res.redirect("admin/category")
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.postEditCategoryData = async (req, res) => {
    const categoryName = req.body.categoryName
    const id = req.body.categoryid
    try {
        // await data.execute("UPDATE category SET name=? WHERE id=?", [categoryName, id])
        const categories = await category.findByPk(id)
        if (categories) {
            categories.name = categoryName
            await categories.save()
            return res.redirect("/category?action=edit")
        }


    } catch (err) {
        console.log(err);
    }

}

module.exports.getDeleteCategoryData = async (req, res) => {
    const categoryid = req.params.categoryId;
    try {
        const categories = await category.findByPk(categoryid)
        res.render("admin/categoryDelete", {
            category: categories
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.postDeleteCategoryData = async (req, res) => {
    const id = req.body.categoryid
    try {
        await category.destroy({
            where: {
                id: id
            }
        })
        res.redirect("/category?action=delete")

    } catch (err) {
        console.log(err);
    }
}

module.exports.get_Category_Remove = async (req, res) => {
    const blogid = req.body.blogid
    const categoryid = req.body.categoryid
     await sequelize.query(`delete from blogcategories where blogId=${blogid} and categoryId=${categoryid}`)
     res.redirect("/admin/category/" + categoryid)
}




