'use strict';
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.tag.belongsToMany(models.apartment, { through: "apartmentTag" })
    }
  }
  tag.init({
    name: {type: DataTypes.STRING,
      unique: true}
  }, {
    sequelize,
    modelName: 'tag',
  })
  return tag
}