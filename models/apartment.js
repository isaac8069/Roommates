'use strict';
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class apartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.apartment.belongsToMany(models.user, { through: "userApartment" })
      models.apartment.belongsToMany(models.tag, { through: "apartmentTag" })
    }
  }
  apartment.init({
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    location: {type: DataTypes.STRING},
    bedrooms: {type: DataTypes.STRING},
    bathrooms: {type: DataTypes.STRING},
    amenities: {type: DataTypes.STRING},
    rent: {type: DataTypes.INTEGER},
    roommates: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
    userId: {type: DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'apartment',
  })
  return apartment
}