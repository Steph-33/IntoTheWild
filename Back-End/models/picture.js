'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Picture.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Picture',
  });
  return Picture;
};