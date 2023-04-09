const privateRoutes = require("./privateRoutes");
const articleRoutes = require("./articleRoutes");
const userRoutes = require("./userRoutes");
const publicRoutes = require("./publicRoutes");
const commentRoutes = require("./commentRoutes")
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");
const apiRoutes = require("./apiRoutes")

module.exports = (app) => {
    app.use(makeUserAvailableInViews);
    app.use("/", publicRoutes);
    app.use("/admin", privateRoutes);
    app.use("/articles", articleRoutes);
    app.use("/user", userRoutes);
    app.use("/api", apiRoutes)
    app.use("/comments", commentRoutes)
}

