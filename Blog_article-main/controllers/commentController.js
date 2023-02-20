const { Comment } = require("../models/index");

async function commentPost(req, res) {
  const articleId = req.params.id;
  await Comment.create({
    content: req.body.content,
    articleId: articleId,
    userId: req.user.id,
  });
  res.redirect(`/articles/${articleId}`);
}
module.exports = { commentPost };
