const privateRoutes = require("./privateRoutes");
const articleRoutes = require("./articleRoutes");
const userRoutes = require("./userRoutes");
const publicRoutes = require("./publicRoutes");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");
const apiRoutes = require("./apiRoutes")
// const flash = require("connect-flash");
// const express = require("express");
// const session = require("express-session");
// const app = express();

// app.configure(function() {
//     app.use(express.cookieParser("Keyboard cat"));
//     app.use(express.session({ cookie: { maxAge: 60000 }}))
//     app.use(flash());
// })   


module.exports = (app) => {
    app.use(makeUserAvailableInViews);
    app.use("/", publicRoutes);
    app.use("/admin", privateRoutes);
    app.use("/articles", articleRoutes);
    app.use("/user", userRoutes);
    app.use("/api", apiRoutes)
}

