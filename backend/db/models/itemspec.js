'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemSpec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItemSpec.belongsTo(models.Item, {foreignKey: 'itemId'})
    }
  }
  ItemSpec.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imagesUrl: DataTypes.TEXT,
    description: DataTypes.TEXT,
    specs: DataTypes.TEXT,
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemSpec',
  });
  return ItemSpec;
};