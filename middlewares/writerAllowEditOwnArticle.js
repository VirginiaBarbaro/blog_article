const {Article} = require("../models") 

async function writerAllowEditOwnArticle(req, res, next) {
  const article = await Article.findByPk(req.params.id)
    if (req.user.roleCode >= 200 || req.user.id === article.userId) {
      next();
    } else {
      console.log("No tenes los permisos");
      res.send("Permission denied")  
    }
  }
  module.exports = writerAllowEditOwnArticle;