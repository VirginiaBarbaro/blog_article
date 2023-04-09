const { User, Article, Comment } = require("../models/index");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const index = async (req, res) => {
  const articles = await Article.findAll({
    include: User,
    order: [["updatedAt", "DESC"]],
  });
  return res.render("home", { articles });
};

const show = async (req, res) => {
  const article = await Article.findByPk(req.params.id, {
    include: [User],
  });
  const comments = await Comment.findAll({
    where: {
      articleId: req.params.id,
    },
    include: User,
  });
  res.render("articles", { article, comments });
};

const loginForm = async (req, res) => {
  res.render("login");
};

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const create = async (req, res) => {
    return res.render("signUp");
  };

  const store = async (req, res) => {
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
  index,
  show,
  loginForm,
  login,
  logout,
  create,
  store
};
