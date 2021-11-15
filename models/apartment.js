'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class apartment extends Model {

    static associate(models) {
      models.apartment.belongsTo(models.user, {through: "userApartment"})
    }
  }
  apartment.init({
    title: DataTypes.STRING,
    rent: DataTypes.INTEGER,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    bedroom: DataTypes.INTEGER,
    bathroom: DataTypes.INTEGER,
    amenity: DataTypes.STRING,
    roommate: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
  sequelize,
  modelName: 'apartment'
  })
  return apartment
}