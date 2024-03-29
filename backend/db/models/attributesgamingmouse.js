'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttributesGamingMouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AttributesGamingMouse.belongsTo(models.Item, {
        foreignKey: 'itemId'
      })
    }
  }
  AttributesGamingMouse.init({
    manufacturer: DataTypes.STRING,
    connectType: DataTypes.STRING,
    dpi: DataTypes.INTEGER,
    itemId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AttributesGamingMouse',
  });
  return AttributesGamingMouse;
};
