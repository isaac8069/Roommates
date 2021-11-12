'use strict'
module.exports = (sequelize, DataTypes) => {
  const apartment = sequelize.define('apartment', {
    title: DataTypes.STRING,
    rent: DataTypes.INTEGER,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    amenities: DataTypes.STRING,
    roomates: DataTypes.INTEGER,
    aboutLister: DataTypes.STRING
  }, {})
  apartment.associate = function(models) {
    // associations can be defined here
    models.apartment.belongsTo(models.users)
    
    models.apartment.hasMany(models.roommates)
  }
  return apartment
}
