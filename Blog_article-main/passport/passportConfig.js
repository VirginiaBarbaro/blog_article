// const session = require("express-session");
// const passport = require("passport");
// const { User } = require("../models");
// const localStrategy = require("./localStrategy");

// module.exports = (app) => {
//   app.use(
//     session({
//       secret: "AlgúnTextoSuperSecreto",
//       resave: false, // Docs: "The default value is true, but using the default has been deprecated".
//       saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
//     }),
//   );

//   app.use(passport.session());

//   passport.use(localStrategy);

//   passport.serializeUser((user, cb) => {
//     cb(null, user.id);
//   });

//   passport.deserializeUser(async (id, cb) => {
//     try {
//       const user = await User.findByPk(id);
//       cb(null, user); // Usuario queda disponible en req.user.
//     } catch (err) {
//       cb(err, user);
//     }
//   });
// };
