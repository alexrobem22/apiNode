"use strict";
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fk_alunos:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'alunos', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      fk_users:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      originalname:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      mimetype:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

  },

  async down (queryInterface) {

    await queryInterface.dropTable('fotos');

  }
};
