'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Address.hasMany(models.Order, {
        foreignKey: 'delivery_address_id',
      });
      models.Address.hasMany(models.Order, {
        foreignKey: 'billing_address_id',
      });
    }
  };
  Address.init({
    number: DataTypes.STRING,
    road: DataTypes.STRING,
    name_of_the_road: DataTypes.STRING,
    zip_code: DataTypes.INTEGER,
    city: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};