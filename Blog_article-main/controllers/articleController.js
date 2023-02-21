const { User, Article, Comment } = require("../models/index");

const showHome = async (req, res) => {
  const articles = await Article.findAll({
    include: User,
    order: [["updatedAt", "DESC"]],
  });
  return res.render("home", { articles });
};

const postDataArticle = async (req, res) => {
  form.parse(req, async (err, fields, files) => {
    const newArticle = await Article.create({
      userId: req.user.id,
      title: fields.title,
      content: fields.content,
      image: files.image.newFilename,
    });
    return res.redirect("/user");
  });
};

const showSingleArticle = async (req, res) => {
  const article = await Article.findByPk(req.params.id, {
    include: [User],
  });
  const comments = await Comment.findAll({
    where: {
      articleId: req.params.id,
    },
    include: User,
  });
  res.render("articles", {article, comments});
};


module.exports = {
  showHome,
  postDataArticle,
  showSingleArticle,
};

