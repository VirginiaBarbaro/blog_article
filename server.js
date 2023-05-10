require("dotenv").config();
const userSeeder = require("./seeders/userSeeder");
const articleSeeder = require("./seeders/articleSeeder");
const commentSeeder = require("./seeders/commentSeeder");
const passport = require("./passport.js");
const cors = require("cors");
const { sequelize, User, Article, Comment } = require("./models");
const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT;
const routes = require("./routes");
const makeUserAvailableInViews = require("./middlewares/makeUserAvailableInViews");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(makeUserAvailableInViews);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport(app);

async function init(sequelize) {
  await sequelize.sync({ force: true });
  await userSeeder(User);
  await articleSeeder(Article);
  await commentSeeder(Comment);
}

//  init(sequelize)

routes(app);
app.listen(APP_PORT, () => console.log(`Listening http://localhost:${APP_PORT}`));

module.exports = app;
