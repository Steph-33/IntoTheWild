'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Album.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    set_list: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};