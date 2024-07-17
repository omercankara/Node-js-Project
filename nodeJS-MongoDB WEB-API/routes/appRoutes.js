const express  = require("express")
const router = express.Router()

const userGetController = require("../controllers/user.js")




router.get("/userList",userGetController.userList)
router.post("/createUser",userGetController.addUser)
router.post("/updateUser",userGetController.updateUser)
router.post("/deleteUser",userGetController.deleteUser)
module.exports = router