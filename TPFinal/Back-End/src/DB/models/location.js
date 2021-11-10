const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Location extends Model {}
Location.init({ 
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true
    },   
    name: DataTypes.STRING, 
    description: DataTypes.STRING,
    creationDate:DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'locations' });
module.exports = Location;