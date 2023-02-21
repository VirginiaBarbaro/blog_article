const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const onlyAdminCanDelete = require("../middlewares/onlyAdminCanDelete")
const editorOnlyModifyComment = require("../middlewares/editorOnlyModifyComment")

router.get("/all-users", adminController.allUsers) 

router.get("/delete/user/:id", onlyAdminCanDelete, adminController.destroyUser);  

router.get("/edit/comments/:id", editorOnlyModifyComment, adminController.editCommentForm); 

router.post("/edit/comments/:id", editorOnlyModifyComment, adminController.editCommentFormData); 

module.exports = router;
