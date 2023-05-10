const { Sequelize } = require("sequelize");

const sequelizeOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTION,
  logging: false,
};
if (process.env.DB_CONNECTION === "postgres") {
  sequelizeOptions.dialectModule = require("pg");
}

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  sequelizeOptions,
);

const User = require("./User");
const Article = require("./Article");
const Comment = require("./Comment");

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

User.hasMany(Article);
Article.belongsTo(User);
Article.hasMany(Comment);
Comment.belongsTo(Article);
User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = { sequelize, User, Article, Comment };
