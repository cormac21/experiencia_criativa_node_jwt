const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('auction_item', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        }
    });
}