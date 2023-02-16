const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);

    return await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('qwerty123', salt),
        username: 'admin'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Users', { [Op.or]: [{ email: 'admin@gmail.com' }] });
  }
};
