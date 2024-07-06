const router=require("express").Router()
const UserController=require("../Controller/UserController")

router.post("/register",UserController.register)
router.post("/sendmail",UserController.sendmail)
router.post("/login",UserController.signin)
module.exports=router;