'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinalCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FinalCategory.hasMany(models.Item, {
        foreignKey: 'categoryId'
      })
      FinalCategory.belongsTo(models.SubCategory, {
        foreignKey: 'subCategoryId'
      })
    }
  }
  FinalCategory.init({
    name: DataTypes.STRING,
    subCategoryId: DataTypes.INTEGER,
    categoryImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FinalCategory',
  });
  return FinalCategory;
};
