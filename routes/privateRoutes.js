const express = require("express");
const router = express.Router();
const readerNotAllowed = require("../middlewares/readerNotAllowed");
const isAuthenticated = require("../middlewares/isAuthenticated");
const privateController = require("../controllers/privateController");

router.get("/", isAuthenticated, readerNotAllowed, privateController.index);

module.exports = router;
