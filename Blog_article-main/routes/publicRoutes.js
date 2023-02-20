const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController")



router.get("/", articleController.showHome);  // OK

// router.get("/form-user", userController.create);

router.get("/login", userController.show); // ok

router.get("/api/blog", articleController.index);  // ok

router.post("/login", userController.login); // ok

router.get("/logout", adminController.logout); // ok

router.get("/sign-up", adminController.signUp); // ok

router.post("/sign-up", adminController.signUpData); // ok


module.exports = router;