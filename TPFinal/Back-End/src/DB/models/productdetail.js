const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class ProductDetail extends Model {}
ProductDetail.init({ 
    id:{
      type: DataTypes.BIGINT,
      allowNull:false,
      autoIncrement: true,
      unique:true,
      primaryKey: true,
    },   
    pruductId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'products',
          key: 'id'
        }
    },
    name: DataTypes.STRING,     
    quantity:DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    description:DataTypes.STRING,
    img:DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'productdetails' });


module.exports = ProductDetail;
