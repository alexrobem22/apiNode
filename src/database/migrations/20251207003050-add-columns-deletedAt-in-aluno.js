module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('alunos', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('alunos', 'deleted_at');
  }
};
