const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');
// import * as model from '../../Middlewares/listimport';

class User extends Model {}
User.init({
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
    },
    documentTypeId: { 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model:'documenttypes',
          key: 'id'
        }
    },
    firstName: DataTypes.STRING, 
    lastName: DataTypes.STRING, 
    address: DataTypes.STRING, 
    phone: DataTypes.STRING,
    docNumber: DataTypes.STRING,
    mail:DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER  
},
{ sequelize, modelName: 'users' });

module.exports = User;

