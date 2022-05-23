const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('experiencia_criativa', 'root', 'mypassword', {
    dialect: "mysql",
    host: "localhost"
});

const modelDefiners = [
    require('./user'),
    require('./userpermission')
]

for ( const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

sequelize.models.User.sync().then();
sequelize.models.UserPermission.sync().then();

module.exports = sequelize;