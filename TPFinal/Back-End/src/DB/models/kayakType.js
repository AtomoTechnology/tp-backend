const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');
import kayak from '../models/kayak';

class KayakType extends Model {}
KayakType.init({ 
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true
    },   
    name: DataTypes.STRING, 
    description: DataTypes.STRING,
    creationDate:DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'kayaktypes' });

KayakType.hasMany(kayak);
kayak.belongsTo(KayakType);

module.exports = KayakType;