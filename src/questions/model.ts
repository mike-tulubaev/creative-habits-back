const { DataTypes } = require('sequelize');
const { accessDb } = require('../database/database');

const sequelize = accessDb();
export const UserAnswers = sequelize.define('UserAnswers', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  answers: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {

});