const { User, Article, Comment } = require("../models/index");
// const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// const form = formidable({
//   multiples: true,
//   uploadDir: __dirname + "/../public/img/",
//   keepExtensions: true,
// });

const showHome = async (req, res) => {
  const articles = await Article.findAll({
    include: User,
    order: [["updatedAt", "DESC"]],
  });
  return res.render("home", { articles });
};

// const createArticleForm = (req, res) => {
//   return res.render("newArticle");
// };
//recibiendo el dato del Formulario
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
// index articles formato json
// const index = async (req, res) => {
//   const title = req.query.title;
//   if (title) {
//     const articles = await Article.findAll({
//       where: {
//         title: {
//           [Op.substring]: `Javascript`,
//         },
//       },
//     });
//     return res.json(articles);
//   }
//   const articles = await Article.findAll();
//   return res.json(articles);
// };

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

// async function show(req, res) {
//   const userId = req.params.id;
//   const articles = await Article.findAll({
//     where: {
//       userId,
//     },
//   });
//   res.json(articles);
// }

// const token = async (req, res) => {
//   const user = await User.findOne({ where: { email: req.body.email } });
//   if (user) {
//    const match = user.isValidPassword(req.body.password)
//    console.log(match)
//     if (match) {
//       const token = jwt.sign({ id: `${user.userId}` }, "secretKey");
//       res.json({ token });
//     }
//   }
// };

module.exports = {
  showHome,
  postDataArticle,
  // index,
  showSingleArticle,
  // show,
  // token,
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmaXJzdG5hbWUiOiJBYmJpZSIsImxhc3RuYW1lIjoiRCdBbW9yZSIsImVtYWlsIjoiTWFyaW9uODVAaG90bWFpbC5jb20ifSwiaWF0IjoxNjc2OTA4MjY2fQ.Yi6eH1ipYL--JJxdq_JlRGV6M6zGlaNjbVgW7PbQUxs
