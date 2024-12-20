const { DataTypes } = require('sequelize');

module.exports = {
   up: async ({ context: queryInterface }) => {
      await queryInterface.createTable('sessions', {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'users',
               key: 'id',
            },
            onDelete: 'CASCADE',
         },
         token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         }
      });
   },

   down: async ({ context: queryInterface }) => {
      await queryInterface.dropTable('sessions');
   },
};
