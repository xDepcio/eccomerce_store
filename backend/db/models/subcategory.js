'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategory.hasMany(models.FinalCategory, {
        foreignKey: 'subCategoryId'
      })
      SubCategory.belongsTo(models.MainCategory, {
        foreignKey: 'mainCategoryId'
      })
    }
  }
  SubCategory.init({
    name: DataTypes.STRING,
    mainCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};
