const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const readerNotAllowed = require("../middlewares/readerNotAllowed");
const articleController = require("../controllers/articleController");
const writerAllowEditOwnArticle = require("../middlewares/writerAllowEditOwnArticle");
const editorNotDeleteOtherArticles = require("../middlewares/editorNotDeleteOtherArticles")

router.get("/create", readerNotAllowed, articleController.create); //Arreglar form crear articulo

router.post("/create", readerNotAllowed, articleController.store); //Arreglar

router.get("/edit/:id", isAuthenticated, writerAllowEditOwnArticle, articleController.edit);

router.post("/edit/:id", writerAllowEditOwnArticle, articleController.update);

router.get("/delete/:id",  editorNotDeleteOtherArticles, articleController.destroy)

module.exports = router;
