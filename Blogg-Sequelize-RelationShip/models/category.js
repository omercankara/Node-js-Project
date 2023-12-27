const { DataTypes, } = require("sequelize")
const sequelize = require("../data/data")

const category = sequelize.define("category", {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }


}, { timestamps: false }
)




module.exports = category