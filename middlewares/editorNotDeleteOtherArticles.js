const {Article} = require("../models") 

async function editorNotDeleteOtherArticles(req, res, next) {
  const article = await Article.findByPk(req.params.id)
    if (req.user.roleCode >= 400 || req.user.id === article.userId) {
      next();
    } else {
      console.log("No tenes los permisos");
      res.send("Permission denied")
      // res.render("notAllowed")  
    }
  }
  module.exports = editorNotDeleteOtherArticles;