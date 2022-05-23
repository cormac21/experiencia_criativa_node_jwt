'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user_permissions', [
      {
        name: 'auction_c'
      },
      {
        name: 'auction_u'
      },
      {
        name: 'auction_d'
      },
      {
        name: 'auction_v'
      },
      {
        name: 'auction_item_c'
      },
      {
        name: 'auction_item_u'
      },
      {
        name: 'auction_item_d'
      },
      {
        name: 'auction_item_v'
      },
      {
        name: 'user_c'
      },
      {
        name: 'user_u'
      },
      {
        name: 'user_d'
      },
      {
        name: 'user_v'
      },
      {
        name: 'bid_c'
      },
      {
        name: 'bid_u'
      },
      {
        name: 'bid_d'
      },
      {
        name: 'bid_v'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user_permissions', {}, null);
  }
};
