import * as encripto from '../Helpers/Cryptographies'
require('dotenv').config();

const user = require('../DB/models/user');
const account = require('../DB/models/account');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export const GetAll = (req, res) => {
    console.log("Llego en GetAll user ", req.params);
    const {
        filter
    } = req.params;
    user.findAll({
        attributes: ['id', 'firstName', 'lastName', 'creationDate', "documentTypeId", "docNumber", 'mail', 'address', 'phone', 'state'],
        where: {
            state: 1
        },
        order: [
            ['id', 'DESC'],
        ]
    }).then(result => {
        res.json(result);
    })
}

export const GetById = (req, res) => {
    const {
        id
    } = req.params;
    console.log("El id corresponde es: ", id);
    user.findOne({
        attributes: ['id', 'firstName', 'lastName', 'creationDate', "documentTypeId", "docNumber", 'mail', 'address', 'phone', 'state'],
        where: {
            id: id
        }
    }).then(result => {
        res.json(result);
    });
}

export const Post = (req, res) => {
    const {
        firstName, lastName,address,phone,
        documentTypeId, mail,docNumber,
            roleId,
            userName,
            userPass
    } = req.body;

    const tiempoTranscurrido = Date.now();
    const today = new Date(tiempoTranscurrido);

    encripto.encryptPassword(userPass).then(val => {
        user.create({
            id: 0,firstName: firstName,lastName: lastName,address: address,phone: phone,creationDate:today,
            documentTypeId: parseInt(documentTypeId), mail: mail,docNumber: docNumber,state: 1
        }).then(us => {
            account.create({
                id: 0, roleId: parseInt(roleId),userId: us.dataValues.id,creationDate:today,
                userName: userName,userPass: val,state: 1
            }).then(p => {
                res.json({
                    status:  parseInt(process.env.success_code),
                    title: 'Crear usuario',
                    message: 'El usuario fue creado con exito'
                });
            })
        });
    });

}

export const Put = (req, res) => {
    const { firstName, lastName, address, phone,documentTypeId,mail,docNumber } = req.body;   
    const { id } = req.params;
    user.update({
        firstName: firstName,lastName: lastName, address: address,
        phone: phone,documentTypeId: parseInt(documentTypeId),
        mail: mail,docNumber: docNumber
    }, {
        where: {
            id: id,
        }
    }).then((response) =>{ 
        if(response[0] === 0){
            res.json({
                status:  parseInt(process.env.success_code),
                message:'El usuario fue modificado con exito'
            });
        }
        else{
            res.json(response);
        }
    })
    .catch((err) =>{
        res.json(err);
    });
}

export const Delete = (req, res) => {
    const { id } = req.params;
    user.update({state: 2},
        {where: {id: id}
    }).then((response) =>{ 
        if(response[0] === 1){
            account.update({state: 2},
                {where: {id: id}
            }).then((result) =>{
                res.json({
                    status: parseInt(process.env.success_code),
                    message:'El usuario fue eliminado con exito'
                });
            })
            .catch((err) =>{
                res.json(err);
            })          
        }
        else{
            res.json(response);
        }
    })
    .catch((err) =>{
        res.json(err);
    });
}