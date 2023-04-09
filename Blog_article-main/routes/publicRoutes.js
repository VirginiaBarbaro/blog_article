const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

router.get("/", articleController.showHome) //index

router.get("/articles", articleController.showSingleArticle);  //Show

router.get("/login", userController.show); 

router.post("/login", userController.login); 

router.get("/logout", adminController.logout); 

router.get("/sign-up", adminController.signUp); 

router.post("/sign-up", adminController.signUpData); 


module.exports = router;