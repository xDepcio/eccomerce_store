'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.FinalCategory, {foreignKey: 'categoryId'})
      // Item.hasOne(models.ItemSpec, {foreignKey: 'itemId'})
      Item.hasMany(models.Review, {foreignKey: 'itemId'})
    }
  }
  Item.init({
    price: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    imagesUrl: DataTypes.TEXT,
    description: DataTypes.TEXT,
    specs: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
