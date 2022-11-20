'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoriesGraphicsAttributesItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoriesGraphicsAttributesItem.belongsTo(models.Item, {
        foreignKey: 'itemId'
      })
    }
  }
  CategoriesGraphicsAttributesItem.init({
    producent: DataTypes.STRING,
    memorySize: DataTypes.INTEGER,
    graphicChip: DataTypes.STRING,
    itemId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoriesGraphicsAttributesItem',
  });
  return CategoriesGraphicsAttributesItem;
};
