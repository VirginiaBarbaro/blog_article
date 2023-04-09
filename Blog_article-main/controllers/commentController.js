const { Comment, Article } = require("../models/index");

const store = async (req, res) => {
  const articleId = req.params.id;
  await Comment.create({
    content: req.body.content,
    articleId: articleId,
    userId: req.user.id,
  });
  res.redirect(`/articles/${articleId}`);
}

const edit = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  res.render("commentEdit", { comment });
}

const update = async (req, res) => {
  const commEdit = await Comment.findByPk(req.params.id, {
    include: Article,
  });
  const commArt = await Article.findOne({
    where: {
      id: commEdit.articleId,
    }
  })
  if (req.user.roleCode >= 300) {
    commEdit.content = req.body.content;
    await commEdit.save();
    console.log(req.body.content)
    res.redirect(`/articles/${commArt.id}`);
  } else {
    res.send("Permissions denied");
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;
  const result = await Comment.findByPk(id, { include: Article });
  await result.destroy();
  if (result) {
    res.redirect(`/articles/${result.article.id}`);
  } else {
    res.send("Permission Denied");
  }
};


module.exports = { store, edit, update, destroy };
