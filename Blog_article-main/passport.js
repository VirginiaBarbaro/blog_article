const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { User } = require("./models/index");

module.exports = (app) => {
  app.use(
    session({
      secret: "AlgúnTextoSuperSecreto",
      resave: false, // Docs: "The default value is true, but using the default has been deprecated".
      saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
    }),
  );
  passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, async function (
      email,
      password,
      cb,
    ) {
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          console.log("Nombre de usuario no existe.");
          return cb(null, false, { message: "Credenciales incorrectas." });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          console.log("La contraseña es inválida.");
          return cb(null, false, { message: "Credenciales incorrectas." });
        }
        console.log("Credenciales verificadas correctamente");
        return cb(null, user);
      } catch (error) {
        cb(error);
      }
    }),
  );
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findByPk(id);
      cb(null, user); // Usuario queda disponible en req.user.
    } catch (err) {
      cb(err, user);
    }
  });

  app.use(passport.session());
};
