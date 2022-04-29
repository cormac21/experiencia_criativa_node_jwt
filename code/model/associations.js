function addAssociations(sequelize) {
    const { auction, auction_item } = sequelize.models;
    auction.hasMany(auction_item);
    auction_item.belongsTo(auction);
}

module.exports = { addAssociations }

