const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const commentController = require("../controllers/commentController");


router.post("/comments/:id", isAuthenticated, commentController.commentPost);

router.get("/:id", articleController.showSingleArticle);

module.exports = router;