const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');
import auth from '../models/auth';

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

Role.hasMany(auth);
auth.belongsTo(Role);

module.exports = Role;