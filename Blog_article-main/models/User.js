const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  async isValidPassword(password) {
   return await bcrypt.compare(password, this.password)
  }
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        roleName: {
          type: DataTypes.STRING,
          // allowNull: false,
        },
        roleCode: {
          type: DataTypes.INTEGER,
          // allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "user",
      },
    );
    // solo funcionan con lo que se crean con bulk, si es solo create no funciona con ese // beforeCreate solo recibe un elemento
    User.beforeBulkCreate(async (users) => {
      for (const user of users) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    // creacion de un solo usuario con password encriptada
    User.beforeCreate(async (user) => {
      user.password = await bcrypt.hash(user.password, 8);
    });

    return User;
  }
}

module.exports = User;
