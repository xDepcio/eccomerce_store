'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {foreignKey: 'reviewerId'})
      Review.belongsTo(models.Item, {foreignKey: 'itemId'})
      Review.belongsToMany(models.User, {through: models.UserVoteReview})
    }
  }
  Review.init({
    reviewerFirstName: DataTypes.STRING,
    reviewContent: DataTypes.STRING,
    reviewerId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    thumbsUp: DataTypes.INTEGER,
    thumbsDown: DataTypes.INTEGER,
    reviewRating: DataTypes.INTEGER,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
