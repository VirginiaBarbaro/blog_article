const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController")
const { expressjwt: checkJwt } = require("express-jwt");


// Api articulos por Author
router.get("/articles/:id", apiController.show); 



router.get("/test", apiController.test)  //Test



// listado de comentarios por articulo
router.get("/comments/:id", apiController.showComments)

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

//Listado de authores
router.get("/authors", checkJwt({ secret: "secretKey", algorithms: ["HS256"] }), apiController.authorList)

//Editar Authors 
router.post("/edit/authors/:id", checkJwt({secret: "secretKey", algorithms: ["HS256"]}), apiController.editAuthor)

//Delete Authors
router.delete("/authors/delete/:id", checkJwt({ secret: "secretKey", algorithms: ["HS256"] }), apiController.deleteAuthors)

//Listado de comentario
router.get("/comments", checkJwt({secret: "secretKey", algorithms: ["HS256"]}), apiController.allComments)

//Editar comments
router.patch("/edit/comments/:id", checkJwt({ secret: "secretKey", algorithms: ["HS256"] }), apiController.editComments)

//Eliminar comentarios 
router.delete("/comments/id:", checkJwt({ secret: "secretKey", algorithms: ["HS256"] }), apiController.deleteComment)

module.exports = router;
