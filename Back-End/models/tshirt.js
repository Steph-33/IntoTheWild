'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tshirt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Tshirt.belongsToMany(models.Order, {
        through: 'OrderProducts',
        foreignKey: 'tshirt_id',
        as: 'orders',
      });
      models.Album.belongsToMany(models.Order, {
        through: 'OrderProducts',
        foreignKey: 'album_id',
        as: 'orders',
      });
    }
  };
  Tshirt.init({
    reference: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Tshirt',
  });
  return Tshirt;
};