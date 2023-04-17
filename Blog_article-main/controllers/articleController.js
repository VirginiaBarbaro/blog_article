const { Article } = require("../models/index");
const formidable = require("formidable");

const form = formidable({
  multiples: true,
  uploadDir: __dirname + "/../public/img/",
  keepExtensions: true,
});

const store = async (req, res) => {
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

const create = (req, res) => {
  return res.render("newArticle");
};

const edit = async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  res.render("editForm", { article });
};

const update = async (req, res) => {
  const artEdit = await Article.findByPk(req.params.id);
  if (req.user.roleCode >= 200) {
    artEdit.title = req.body.title;
    artEdit.content = req.body.content;
    await artEdit.save();
    res.redirect("/");
  } else {
    res.send("Permissions denied");
  }
};


const destroy = async (req, res) => {
  const id = req.params.id;
  await Article.destroy({
    where: {
      id: id,
    },
  }).then((result) => {
    if (result) {
      res.redirect("/admin");
    } else {
      res.render("notFound");
    }
  });
};

module.exports = {
  create,
  store,
  update,
  edit,
  destroy,
};
