const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('auction_item', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        minimumAmount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
}