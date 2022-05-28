const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Role extends Model {}
Role.init({ 
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
    },   
    name: DataTypes.STRING, 
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'roles' });

module.exports = Role;