'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Live extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Live.init({
    place: DataTypes.STRING,
    address: DataTypes.STRING,
    date: DataTypes.DATE,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Live',
  });
  return Live;
};