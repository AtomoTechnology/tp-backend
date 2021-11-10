const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Account extends Model {}
Account.init({
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,unique:true,
        primaryKey: true,
    },
    idUser: DataTypes.BIGINT,
    idRole: DataTypes.BIGINT,
    userName: DataTypes.STRING, 
    confirmPass: {
        type: DataTypes.STRING,
        allowNull: true,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('La confirmación contraseña debe contener al menos un numero y un letra mayucula');
            }
            // if (value === "" || value === null || value !== undefined) {
            //     throw new Error('Debe confirmar la contraseña');
            // }
        },
        private: true, // used by the toJSON plugin
    }, 
    userPass: {
        type: DataTypes.STRING,
        allowNull: false,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('La contraseña debe contener al menos un numero y un letra mayucula');
            }
        },
        private: true, // used by the toJSON plugin
    }, 
    newUserPass: {
        type: DataTypes.STRING,
        allowNull: true,
        validate(value) {
            if(value !== "" && value !== null && value !== undefined){
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('La nueva contraseña debe contener al menos un numero y un letra mayucula');
                }
            }
           
        },
        private: true, // used by the toJSON plugin
    }, 
    state: DataTypes.INTEGER  
},
{ sequelize, modelName: 'accounts' });

module.exports = Account;
