const { DataTypes, } = require("sequelize")
const sequelize = require("../data/data")

const blog = sequelize.define("blog", { 

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    altbaslik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resim: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    anasayfa: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    onay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },


})






module.exports = blog