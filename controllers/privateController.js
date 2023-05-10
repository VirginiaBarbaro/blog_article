const { User, Article, Comment } = require("../models/index");

const index = async (req, res) => {
  //ruta de admin
  console.log("User que entro a admin = " + req.user.id);
  if (req.user && req.user.roleCode >= 300) {
    const articles = await Article.findAll({
      include: User,
    });
    return res.render("admin", { articles });
  } else {
    const articles = await Article.findAll({
      where: {
        userId: req.user.id,
      },
      include: User, // incluyo User para la columna que trae firstname & lastname
    });
    return res.render("admin", { articles });
  }
};

module.exports = {
  index,
};
