const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const onlyAdminCanDelete = require("../middlewares/onlyAdminCanDelete");

router.get("/delete/:id", onlyAdminCanDelete, userController.destroy);

router.get("/edit/:id", onlyAdminCanDelete, userController.edit);

router.post("/edit/:id", onlyAdminCanDelete, userController.update);

router.get("/", onlyAdminCanDelete, userController.index);

module.exports = router;
