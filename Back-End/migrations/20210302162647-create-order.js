'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_of_order: {
        type: Sequelize.DATE
      },
      total_price: {
        type: Sequelize.FLOAT
      },
      delivery_address_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Addresses',
          key: 'id',
        },
      },
      billing_address_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Addresses',
          key: 'id',
        },
      },
      order_status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'OrderStatuses',
          key: 'id',
        },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('Orders');
  }
};