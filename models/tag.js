'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {

    static associate(models) {
      models.tag.hasMany(models.user, {through: "userTag"})
    }
  }
  tag.init({
    name: DataTypes.STRING,
  }, {
  sequelize,
  modelName: 'tag'
  })
  return tag
}