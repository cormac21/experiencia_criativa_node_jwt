const { Sequelize } = require('sequelize');
const { addAssociations } = require('./associations')

const sequelize = new Sequelize('experiencia_criativa', 'root', 'admin', {
    dialect: "mysql",
    host: "localhost"
});

const modelDefiners = [
    require('./Auction'),
    require('./AuctionItem'),
    require('./User'),
]

for ( const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

addAssociations(sequelize);

sequelize.models.auction.sync().then();
sequelize.models.auction_item.sync().then();

module.exports = sequelize;