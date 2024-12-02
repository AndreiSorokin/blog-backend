const { DataTypes } = require('sequelize');

module.exports = {
   up: async ({ context: queryInterface }) => {
      await queryInterface.createTable('users', {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
         },
      });

      await queryInterface.createTable('blogs', {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         author: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         url: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         title: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
         },
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
      },
      createdAt: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      updatedAt: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      });
   },

   down: async ({ context: queryInterface }) => {
      await queryInterface.dropTable('blogs');
      await queryInterface.dropTable('users');
   },
};
