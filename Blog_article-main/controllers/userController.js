const { User, Article } = require("../models/index");

const errorLogin = async (email, passeord, done) => {
  User.findOne({ email: email }).then((user) => {
    if (!user) return done(null, false, { message: "Invalid credentials" });
    if (user.password === password) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
};

async function create(req, res) {
  res.render("newUser");
}

// const createArticleForm = (req, res) => {
//   return res.render("newArticle");
// };

// const postDataArticle = async (req, res) => {
//   form.parse(req, async (err, fields, files) => {
//     const newArticle = await Article.create({
//       userId: req.user.id,
//       title: fields.title,
//       content: fields.content,
//       image: files.image.newFilename,
//     });
//     return res.redirect("/user");
//   });
// };

const destroy = async (req, res) => {
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
    res.redirect("/user");
  } else {
    res.send("Permission Denied");
  }
};

const edit = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.render("adminEditUser", { user });
};

const update = async (req, res) => {
  editUser = await User.findByPk(req.params.id);

  editUser.firstname = req.body.firstname;
  editUser.lastname = req.body.lastname;

  await editUser.save();
  console.log(req.body);
  res.redirect("/user");
};

const index = async (req, res) => {
  const users = await User.findAll();
  if (req.user && req.user.roleCode >= 400) {
    return res.render("allUser", { users });
  } else {
    res.send("Permission denied");
  }
};

module.exports = {
  create,
  edit,
  index,
  update,
  destroy,
};
