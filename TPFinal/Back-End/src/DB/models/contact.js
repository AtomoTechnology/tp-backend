const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Contact extends Model {}
Contact.init({ 
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
    },   
    name: DataTypes.STRING, 
    email: DataTypes.STRING, 
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'contacts' });

module.exports = Contact;