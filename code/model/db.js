const Sequelize = require('sequelize');

const sequelize = new Sequelize('experiencia_criativa', 'root', 'admin', {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;