const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Role extends Model {}
Role.init({ 
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true
    },   
    name: DataTypes.STRING, 
    description: DataTypes.STRING,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'roles' });
module.exports = Role;