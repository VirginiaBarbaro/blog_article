const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const commentController = require("../controllers/commentController");
const adminController = require("../controllers/adminController")
const onlyAdminCanDelete = require("../middlewares/onlyAdminCanDelete");
const editorOnlyModifyComment = require("../middlewares/editorOnlyModifyComment")


router.post("/comments/:id", isAuthenticated, commentController.commentPost);

router.get("/:id", articleController.showSingleArticle);

router.get("/comments/:id", editorOnlyModifyComment, onlyAdminCanDelete, adminController.destroyComment)

module.exports = router;