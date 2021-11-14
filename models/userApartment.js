'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userApartment extends Model {

    static associate(models) {
      // define association here
    }
  };
  userApartment.init({
    userId: DataTypes.INTEGER,
    apartmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userApartment',
  });
  return userApartment;
};