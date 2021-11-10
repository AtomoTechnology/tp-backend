const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');
import kayak from './kayak';
import account from './account';

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
    idDocumentType: DataTypes.BIGINT,
    docNumber: DataTypes.STRING,
    mail:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email incorrecto');
            }
        }
    },
    creationDate:DataTypes.DATE,
    state: DataTypes.INTEGER  
},
{ sequelize, modelName: 'users' });

//Relacion
    User.hasMany(kayak);
    kayak.belongsTo(User);

    User.hasMany(account);
    account.belongsTo(User);

module.exports = User;

