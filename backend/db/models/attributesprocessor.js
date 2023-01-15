'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttributesProcessor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AttributesProcessor.belongsTo(models.Item, {
        foreignKey: 'itemId'
      })
    }
  }
  AttributesProcessor.init({
    manufacturer: DataTypes.STRING,
    socketType: DataTypes.STRING,
    coresCount: DataTypes.INTEGER,
    itemId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AttributesProcessor',
  });
  return AttributesProcessor;
};
