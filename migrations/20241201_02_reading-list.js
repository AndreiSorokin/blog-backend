const { DataTypes } = require('sequelize');

module.exports = {
   up: async ({ context: queryInterface }) => {
      await queryInterface.createTable('reading_lists', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      userId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: { model: 'users', key: 'id' },
         onDelete: 'CASCADE',
      },
      blogId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: { model: 'blogs', key: 'id' },
         onDelete: 'CASCADE',
      },
      read: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,
         allowNull: false,
      },
      createdAt: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
      updatedAt: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
   });
   },

   down: async ({ context: queryInterface }) => {
      await queryInterface.dropTable('reading_lists');
   },
};