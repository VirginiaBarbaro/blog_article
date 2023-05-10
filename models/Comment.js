const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static initModel(sequelize) {
    Comment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "comment",
      },
    );
    return Comment;
  }
}

module.exports = Comment;
