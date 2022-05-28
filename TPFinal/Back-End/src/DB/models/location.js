const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Location extends Model {}
Location.init({ 
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
    },   
    accountId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'accounts',
          key: 'id'
        }
    },   
    name: DataTypes.STRING, 
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER  
},
{ sequelize, modelName: 'locations' });
module.exports = Location;