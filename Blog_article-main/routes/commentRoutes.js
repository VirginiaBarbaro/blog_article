const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const editorOnlyModifyComment = require("../middlewares/editorOnlyModifyComment");
const isAuthenticated = require("../middlewares/isAuthenticated");
const onlyAdminCanDelete = require("../middlewares/onlyAdminCanDelete");

router.post("/:id", isAuthenticated, commentController.store);

router.get("/edit/:id", editorOnlyModifyComment, commentController.edit);

router.post("/edit/:id", editorOnlyModifyComment, commentController.update);

router.get("/delete/:id", editorOnlyModifyComment, onlyAdminCanDelete, commentController.destroy);

module.exports = router;
