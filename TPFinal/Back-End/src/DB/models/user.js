const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class User extends Model {}
User.init({
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,unique:true,
        primaryKey: true
    },
    firstName: DataTypes.STRING, 
    lastName: DataTypes.STRING, 
    address: DataTypes.STRING, 
    phone: DataTypes.STRING, 
    userName: DataTypes.STRING, 
    userPass: DataTypes.STRING, 
    idRole: DataTypes.BIGINT,
    idDocumentType: DataTypes.BIGINT,
    mail: DataTypes.STRING,
    docNumber: DataTypes.STRING,
    state: DataTypes.INTEGER  
},
{ sequelize, modelName: 'users' });

module.exports = User;

