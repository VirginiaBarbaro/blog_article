const { User, Article, Comment } = require("../models/index");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

async function show(req, res) {
  const userId = req.params.id;
  const articles = await Article.findAll({
    where: {
      userId,
    },
  });
  res.json(articles);
}

const showComments = async (req, res) => {
  const articleId = req.params.id;
  const comments = await Comment.findAll({
    where: {
      articleId,
    },
  });
  res.json(comments);
};

const index = async (req, res) => {
  const title = req.query.title;
  if (title) {
    const articles = await Article.findAll({
      where: {
        title: {
          [Op.substring]: `Javascript`,
        },
      },
    });
    return res.json(articles);
  }
  const articles = await Article.findAll();
  return res.json(articles);
};

const token = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const match = user.isValidPassword(req.body.password);
    console.log(match);
    if (match) {
      const token = jwt.sign({ id: `${user.userId}` }, "secretKey");
      res.json({ token });
    }
  }
};

const patch = async (req, res) => {
  await Article.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      }, //filas afectada
    },
  ).then((result) => {
    res.json(result);
  });
};

const create = async (req, res) => {
  await Article.create({
    title: req.body.title,
    content: req.body.content,
  }).then((data) => {
    res.json(data);
  });
};

const destroy = async (req, res) => {
  await Article.destroy({
    where: {
      id: req.params.id,
    },
  }).then((output) => {
    res.json(output);
  });
};

const authorList = async (req, res) => {
  const author = await User.findAll();
  res.json(author);
};

const editAuthor = async (req, res) => {
  await User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      }, //filas afectada
    },
  ).then((result) => {
    res.json(result);
  });
};

const deleteAuthors = async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  }).then((output) => {
    res.json(output);
  });
};

module.exports = {
  show,
  index,
  token,
  patch,
  create,
  destroy,
  showComments,
  authorList,
  editAuthor,
  deleteAuthors
};
