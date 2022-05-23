'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class AuctionItem extends Model {
    static associate(models) {
      AuctionItem.belongsTo(models.Auction, {
        foreignKey: 'auctionItemId'
      });
    }
  }
  AuctionItem.init({
    description: DataTypes.STRING,
    minimumAmount: DataTypes.DECIMAL,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AuctionItem',
  });
  return AuctionItem;
};