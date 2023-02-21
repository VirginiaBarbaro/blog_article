const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController")
const { expressjwt: checkJwt } = require("express-jwt");
const onlyAdminCanDelete = require("../middlewares/onlyAdminCanDelete")


// Api articulos por Author
router.get("/articles/:id", apiController.show); 

// Genera el token
router.post("/token", apiController.token) // genera el token 

// Api con todos los articulos y buscar palabra que incluyen.. sirve el token
router.get("/articles", checkJwt({ secret: "secretKey", algorithms: ["HS256"] }), apiController.index); 

// Modificar Articulos // Title y Content como body // Devuelve 1, significa que 1 row ha sido actualizada
router.patch("/:id", checkJwt({ secret: "secretKey", algorithms: ["HS256"] }), apiController.patch)

//Crear articulo
router.post("/posts", checkJwt({ secret: "secretKey", algorithms: ["HS256"] }), apiController.create);

// Eliminar articulo
router.delete("/:id", checkJwt({ secret: "secretKey", algorithms: ["HS256"] }), apiController.destroy)


module.exports = router;