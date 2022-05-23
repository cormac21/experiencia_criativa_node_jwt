'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class UserPermission extends Model {
    static associate(models) {
      UserPermission.belongsToMany(User, { through: 'UserHasPermission' })
    }
  }
  UserPermission.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPermission',
  });
  return UserPermission;
};