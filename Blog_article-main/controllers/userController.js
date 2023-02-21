const { User, Article } = require("../models/index");
const passport = require("passport");
const formidable = require("formidable");

const form = formidable({
  multiples: true,
  uploadDir: __dirname + "/../public/img/",
  keepExtensions: true,
});

// Display a listing of the users.
async function index(req, res) {}

// Display the specified user.
async function show(req, res) {
  res.render("login");
}

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

const errorLogin = async (email, passeord, done) => {
  User.findOne({email: email})
  .then((user) => {
    if (!user) return done(null, false, {message: "Invalid credentials"})
    if (user.password === password) {
      return done(null, user);
    } else {
      return done(null, false)
    }
  })
}

// Show the form for creating a new user
async function create(req, res) {
  res.render("newUser");
}

const createArticleForm = (req, res) => {
  return res.render("newArticle");
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

const destroy = async (req, res) => {
  const id = req.params.id;
  await Article.destroy({
    where: {
      id: id,
    },
  }).then((result) => {
    if (result) {
      res.redirect("/user");
    } else {
      res.render("notFound");
    }
  });
};

const editForm = async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  res.render("editForm", { article });
};

// Store a newly created user in storage.
const editFormData = async (req, res) => {
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

module.exports = {
  index,
  show,
  create,
  login,
  createArticleForm,
  postDataArticle,
  panelAdmin,
  destroy,
  editForm,
  editFormData
};
