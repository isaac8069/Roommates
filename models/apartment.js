'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class apartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.apartment.belongsToMany(models.user, {through: "userApartment"})
      models.apartment.belongsToMany(models.tag, {through: "userTag"})
    }
  };
  apartment.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    amenities: DataTypes.STRING,
    rent: DataTypes.INTEGER,
    roommates: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'apartment',
  });
  return apartment;
};