function addAssociations(sequelize) {
    const { auction, auction_item, bid } = sequelize.models;
    auction.hasMany(auction_item);
    auction_item.belongsTo(auction);
    auction_item.hasMany(bid);
    bid.belongsTo(auction_item);
}

module.exports = { addAssociations }

