const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class UserContact extends Model {}
UserContact.init({ 
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
    userId: { 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'users',
          key: 'id'
        }
    },
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'usercontacts' });

module.exports = UserContact;