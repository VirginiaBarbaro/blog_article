module.exports = function (sequelize) {
    sequelize 
    .authenticate()
    .then(() => {
        console.log("Se establecio conexion")
    })
    .catch((error) => {
        console.log(error)
    })
};
