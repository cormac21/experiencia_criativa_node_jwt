const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('auction', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        created_by_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        auction_status: {
            type: DataTypes.ENUM("pending", "active", "closed"),
            allowNull: true,
        },
    });
}
