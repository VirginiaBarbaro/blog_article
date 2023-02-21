const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

router.get("/", articleController.showHome)

router.get("/articles", articleController.showSingleArticle);  // OK

router.get("/login", userController.show); // ok

router.post("/login", userController.login); // ok

router.get("/logout", adminController.logout); // ok

router.get("/sign-up", adminController.signUp); // ok

router.post("/sign-up", adminController.signUpData); // ok


module.exports = router;