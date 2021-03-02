'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.OrderProduct.belongsTo(models.Order, {
        foreignKey: {
          allowNull: true,
          name: 'order_id',
        },
      });
      models.OrderProduct.belongsTo(models.Tshirt, {
        foreignKey: {
          allowNull: true,
          name: 'tshirt_id',
        },
      });
      models.OrderProduct.belongsTo(models.Album, {
        foreignKey: {
          allowNull: true,
          name: 'album_id',
        },
      });
    }
  };
  OrderProduct.init({
    album_quantity: DataTypes.INTEGER,
    tshirt_quantity: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER,
    tshirt_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};