const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Kayak extends Model {}
Kayak.init({ 
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true
    },   
    userId: DataTypes.BIGINT, 
    hangerId: DataTypes.BIGINT,
    kayaktypeId: DataTypes.BIGINT,
    crewmember:DataTypes.INTEGER,
    shovelQuantity:DataTypes.INTEGER,
    nroKayak:DataTypes.DATE,
    img:DataTypes.STRING,
    creationDate:DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'kayaks' });


module.exports = Kayak;