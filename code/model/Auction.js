const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('auction', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        createdByUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "active", "closed"),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
}
