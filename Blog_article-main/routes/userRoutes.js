const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const readerNotAllowed = require("../middlewares/readerNotAllowed");
const isAuthenticated = require("../middlewares/isAuthenticated");
const editorNotDeleteOtherArticles = require("../middlewares/editorNotDeleteOtherArticles");
const writerAllowEditOwnArticle = require("../middlewares/writerAllowEditOwnArticle")


router.get("/create", readerNotAllowed, userController.createArticleForm); 

router.post("/create", readerNotAllowed, userController.postDataArticle);

router.get("/", isAuthenticated, readerNotAllowed, userController.panelAdmin);

router.get("/delete/:id", editorNotDeleteOtherArticles, userController.destroy);

router.get("/edit/:id", isAuthenticated, writerAllowEditOwnArticle, userController.editForm);

router.post("/edit/:id", writerAllowEditOwnArticle, userController.editFormData);

module.exports = router;