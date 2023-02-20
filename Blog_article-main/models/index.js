const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    logging: false, // Para evitar que Secuelize envie los mensajes de creacion
  },
);

const User = require("./User");
const Article = require("./Article");
const Comment = require("./Comment");

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

//Asociacion
User.hasMany(Article);
Article.belongsTo(User);
Article.hasMany(Comment);
Comment.belongsTo(Article);
User.hasMany(Comment);
Comment.belongsTo(User);


module.exports = { sequelize, User, Article, Comment};
