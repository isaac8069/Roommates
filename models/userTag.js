'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userTag extends Model {
      
    static associate(models) {
      // define association here
    }
  };
  userTag.init({
    userId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userTag',
  });
  return userTag;
};