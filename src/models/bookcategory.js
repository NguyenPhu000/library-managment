"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BookCategory extends Model {
    static associate(models) {
      // Thuộc tính trung gian,  đã định nghĩa belongsToMany ở Book & Category
    }
  }
  BookCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      book_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      assigned_by: DataTypes.INTEGER,
      assigned_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BookCategory",
      tableName: "BookCategories",
      timestamps: false,
    }
  );
  return BookCategory;
};
