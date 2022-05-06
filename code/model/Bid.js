const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('bid', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        createdByUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
    });
}