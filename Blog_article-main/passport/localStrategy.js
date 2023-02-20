// const localStrategy = require("passport-local");
// const { User } = require("../models");

// module.exports = new localStrategy(
//   { usernameField: "email", passwordField: "password" },
//   async function (email, password, cb) {
//     try {
//       const user = await User.findOne({ where: { email } });
//       if (!user) {
//         console.log("Nombre de usuario no existe.");
//         return cb(null, false, { message: "Credenciales incorrectas." });
//       }
//       const match = await user.isValidPassword(password)
//       if (!match) {
//         console.log("La contraseña es inválida.");
//         return cb(null, false, { message: "Credenciales incorrectas." });
//       }
//       console.log("Credenciales verificadas correctamente");
//       return cb(null, user);
//     } catch (error) {
//       cb(error);
//     }
//   },
// );
