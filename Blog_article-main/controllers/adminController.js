const { sequelize, User, Article, Comment } = require("../models/index");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");

const panelAdmin = async (req, res) => {
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

const editForm = async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  res.render("editForm", { article });
};

const editCommentForm = async (req, res) => {
  const comment = await Comment.findByPk(req.params.id);
  res.render("commentEdit", { comment });
}

const editCommentFormData = async (req, res) => {
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

const editFormData = async (req, res) => {
  const artEdit = await Article.findByPk(req.params.id);
  if (req.user.roleCode >= 200) {
    artEdit.title = req.body.title;
    artEdit.content = req.body.content;
    await artEdit.save();
    res.redirect("/articles");
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

const destroyComment = async (req, res) => {
  const id = req.params.id;
  const result = await Comment.findByPk(id, { include: Article });
  await result.destroy();
  if (result) {
    res.redirect(`/articles/${result.article.id}`);
  } else {
    res.send("Permission Denied");
  }
};

const destroyUser = async (req, res) => {
  const id = req.params.id;
  const result = await User.findByPk(id);
  const article = await Article.findAll({
    where: {
      userId: id,
    },
  });
  await Article.destroy({
    where: {
      userId: id,
    },
  });
  await result.destroy();
  if (result) {
    res.redirect("/admin/all-users");
  } else {
    res.send("Permission Denied");
  }
};

// const modifyUser = async (req, res) => {

// }

const allUsers = async (req, res) => {
  const users = await User.findAll();
  if (req.user && req.user.roleCode >= 400) {
    return res.render("allUser", { users });
  } else {
    res.send("Permission denied");
  }
};

const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const signUp = async (req, res) => {
  return res.render("signUp");
};

const signUpData = async (req, res) => {
  //le pasamos la password ya hasheada
  const passHashed = await bcrypt.hash(req.body.password, 8);
  const [user, created] = await User.findOrCreate({
    where: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passHashed,
      roleCode: 100,
      roleName: "reader"
    },
  });
  if (created) {
    req.login(user, () => res.redirect("/"));
  } else {
    res.redirect("/sign-up");
  }
};

module.exports = {
  panelAdmin,
  editForm,
  editFormData,
  destroy,
  logout,
  signUp,
  signUpData,
  destroyComment,
  allUsers,
  destroyUser,
  editCommentForm,
  editCommentFormData
};
