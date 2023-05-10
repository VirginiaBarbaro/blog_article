const { Model, DataTypes } = require("sequelize");

class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "article",
      },
    );
    return Article;
  }
}

module.exports = Article;
