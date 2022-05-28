const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Account extends Model {}
Account.init({
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
    },
    userId: { 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'users',
          key: 'id'
        }
    },
    roleId: { 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        field: 'roleId',
        references: {
          model: 'roles',
          key: 'id'
        }
    },
    userName: DataTypes.STRING, 
    userPass: DataTypes.STRING, 
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER  
},
{ sequelize, modelName: 'accounts' });

module.exports = Account;
