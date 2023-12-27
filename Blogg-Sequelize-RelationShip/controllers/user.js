const blog = require("../models/blog")
const category = require("../models/category")
const { Op } = require("sequelize")

module.exports.blogsByCategory = async function (req, res) {
     const id = req.params.categoryId 
    try {
        /*  const [blog,] = await data.execute("SELECT * FROM blog where categoryId=?", [id]) */ //categoryİd bilgisine göre olan verileri getir örneğin 1 olan veriler
        /*  const [category,] = await data.execute("SELECT * From category") */
        const blogs = await blog.findAll({
            where: {
                /* categoryId: id, */
                onay: true
            },
            include: {
                model: category,
                where: {
                    id:id
                }
            },
            raw: true
        })
        const categories = await category.findAll({ raw: true })

        res.render("users/blogs", {
            blogs: blogs,
            categories: categories,
            selectedCategories: id
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports.blogsDetails = async function (req, res) {
    try {
        /* const [blog,] = await data.execute("SELECT * FROM blog where id=?", [id]) */
        const id = req.params.id;
        const blogs = await blog.findByPk(id)
        if (blogs) {
            res.render("users/blogDetails", {
                blog: blogs,
                selectedCategories: null
            })
        } else {
            res.redirect("/")
        }
    } catch (err) {
        console.log(err);
    }

}

module.exports.blogList = async function (req, res) {
    try {
        /* const [blogs,] = await data.execute("SELECT * FROM blog where onay=1") */
        /*  const [category,] = await data.execute("SELECT * FROM category") */
        const blogs = await blog.findAll({
            where: {    // onay: true
                onay: {
                    [Op.eq]: true

                },
            },
            raw: true
        })

        const categories = await category.findAll({ raw: true })
        res.render("users/blogs", {
            blogs: blogs,
            categories: categories,
            selectedCategories: null
        })
        // res.json(blogs)
    } catch (err) {
        console.log(err);
    }

}

module.exports.blogIndex = async function (req, res) {
    try {
        const blogs = await blog.findAll({
            where: {
                //  anasayfa: true,
                //  onay: true, 
                [Op.and]: [
                    {
                        anasayfa: true,
                        onay: true,
                    }
                ]
            },
            raw: true
        })
        const categories = await category.findAll({ raw: true })

        /*  let data = []
         data.push(blogs, categories)
         res.json(data) */

        res.render("users/index", {
            blogs: blogs,
            categories: categories,
            selectedCategories: null
        })


    } catch (err) {
        console.log(err)
    }
}