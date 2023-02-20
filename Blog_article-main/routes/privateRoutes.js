const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const adminController = require("../controllers/adminController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const readerNotAllowed = require("../middlewares/readerNotAllowed")
const writerAllowEditOwnArticle = require("../middlewares/writerAllowEditOwnArticle")
const editorNotDeleteOtherArticles = require("../middlewares/editorNotDeleteOtherArticles")
const onlyAdminCanDelete = require("../middlewares/onlyAdminCanDelete")
const editorOnlyModifyComment = require("../middlewares/editorOnlyModifyComment")
// Toda las rutas adelante tienen /admin

router.get("/create", readerNotAllowed, articleController.createArticleForm); // articles routes

router.post("/create", readerNotAllowed, articleController.postDataArticle); // articles routes

router.get("/", isAuthenticated, readerNotAllowed, adminController.panelAdmin);

router.get("/delete/:id", editorNotDeleteOtherArticles, adminController.destroy); 

router.get("/comments/delete/:id", adminController.destroyComment); 

router.get("/edit/:id", isAuthenticated, writerAllowEditOwnArticle, adminController.editForm); 

router.post("/edit/:id", writerAllowEditOwnArticle, adminController.editFormData); 

router.get("/all-users", adminController.allUsers) 

router.get("/delete/user/:id", onlyAdminCanDelete, adminController.destroyUser); 

router.get("/edit/comment/:id", editorOnlyModifyComment, adminController.editCommentForm);

router.post("/edit/comment/:id", editorOnlyModifyComment, adminController.editCommentFormData);

module.exports = router;
