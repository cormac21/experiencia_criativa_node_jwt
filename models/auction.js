'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Auction extends Model {
    static associate(models) {
      Auction.hasMany(models.AuctionItem, {
        foreignKey: 'auctionId'
      })
    }
  }
  Auction.init({
    createdByUser: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    status: DataTypes.ENUM("pending", "active", "closed"),
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Auction',
  });
  return Auction;
};