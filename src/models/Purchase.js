const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase = sequelize.define('purchase', {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
}, { underscored: true });

module.exports = Purchase;