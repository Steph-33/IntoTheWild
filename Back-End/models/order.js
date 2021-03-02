'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: 'user_id',
        },
      });
      models.Order.belongsTo(models.OrderStatus, {
        foreignKey: {
          allowNull: false,
          name: 'order_status_id',
        },
      });
      models.Order.belongsTo(models.Address, {
        foreignKey: {
          allowNull: false,
          name: 'delivery_address_id',
        },
      });
      models.Order.belongsTo(models.Address, {
        foreignKey: {
          allowNull: false,
          name: 'billing_address_id',
        },
      });
      models.Order.belongsToMany(models.Tshirt, {
        through: 'OrderProducts',
        foreignKey: 'order_id',
        as: 'products',
      });
      models.Order.belongsToMany(models.Album, {
        through: 'OrderProducts',
        foreignKey: 'order_id',
        as: 'products',
      });
    }
  };
  Order.init({
    date_of_order: DataTypes.DATE,
    total_price: DataTypes.FLOAT,
    delivery_address_id: DataTypes.INTEGER,
    billing_address_id: DataTypes.INTEGER,
    order_status_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};