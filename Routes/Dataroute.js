const router=require("express").Router()
const dataController=require("../Controller/dataController");
const { verifyUser, Isuser } = require("../middleware/auth");
router.post("/",verifyUser,Isuser,dataController.create)
module.exports=router;