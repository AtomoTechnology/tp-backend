const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Product extends Model {}
Product.init({ 
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
    name: DataTypes.STRING,   
    description:DataTypes.STRING,
    img:DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'products' });


module.exports = Product;
