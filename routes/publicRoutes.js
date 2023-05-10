const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");

router.get("/", publicController.index);

router.get("/articles/:id", publicController.show);

router.get("/login", publicController.loginForm);

router.post("/login", publicController.login);

router.get("/logout", publicController.logout);

router.get("/sign-up", publicController.create);

router.post("/sign-up", publicController.store);

module.exports = router;
