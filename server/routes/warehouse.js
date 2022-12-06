const express = require("express");
const router=express.Router();
const studentController=require("../controllers/warehousecontroller");
 
//login
router.get("/",studentController.login);
router.get("/signup",studentController.signup);
router.post("/auth",studentController.homepage);

//orders page
router.get("/items",studentController.view);

//ViewCart
router.get("/viewCart",studentController.cart);
 
//Add to cart
router.post("/addCart",studentController.save1);

//previous order
router.get("/previousOrder",studentController.pOrder);


//Update Records
router.get("/edituser",studentController.edituser1);
router.post("/edituser",studentController.edit);
 
//Delete Records
router.get("/delete",studentController.delete);

 
module.exports=router;
 