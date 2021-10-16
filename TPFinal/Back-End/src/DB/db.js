const { Sequelize } = require('sequelize');
const { database } = require('../config/config');
require('dotenv').config();

const sequelize = new Sequelize(
    database.database,
    database.user,
    database.password,{
        host:database.host,
        dialect:"mysql",
        define: {
            timestamps: false
        },
        operatorsAliases: false,
        logging: false, // <--- Disable logging
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);
module.exports = sequelize;