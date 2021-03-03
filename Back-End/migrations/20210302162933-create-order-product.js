'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      album_quantity: {
        type: Sequelize.INTEGER
      },
      tshirt_quantity: {
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      album_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums',
          key: 'id',
        },
      },
      tshirt_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tshirts',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderProducts');
  }
};