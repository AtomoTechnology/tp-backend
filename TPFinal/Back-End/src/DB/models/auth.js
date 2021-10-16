const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');
const role =  require('../models/role');

class Auth extends Model {}
Auth.init({    
    userName: DataTypes.STRING, 
    userPass: DataTypes.STRING,   
    idRole: DataTypes.BIGINT,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'accounts' });

module.exports = Auth;