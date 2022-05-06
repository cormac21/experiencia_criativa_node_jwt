const { Sequelize } = require('sequelize');
const { addAssociations } = require('./associations')

const sequelize = new Sequelize('experiencia_criativa', 'root', 'mypassword', {
    dialect: "mysql",
    host: "localhost"
});

const modelDefiners = [
    require('./Auction'),
    require('./AuctionItem'),
    require('./User'),
    require('./Bid')
]

for ( const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

addAssociations(sequelize);

sequelize.models.auction.sync().then();
sequelize.models.auction_item.sync().then();
sequelize.models.user.sync().then();
sequelize.models.bid.sync().then();

module.exports = sequelize;