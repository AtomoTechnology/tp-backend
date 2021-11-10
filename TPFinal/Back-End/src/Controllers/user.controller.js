import * as encripto from '../Helpers/Cryptographies'
require('dotenv').config();

const user = require('../DB/models/user');
const account = require('../DB/models/account');

export const GetAll = (req, res) => {
    user.findAll({
        attributes: ['id', 'firstName', 'lastName', 'creationDate', "idDocumentType", "docNumber", 'mail', 'address', 'phone', 'state'],
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
    user.findOne({
        attributes: ['id', 'firstName', 'lastName', 'creationDate', "idDocumentType", "docNumber", 'mail', 'address', 'phone', 'state'],
        where: {
            id: id
        }
    }).then(result => {
        res.json(result);
    });
}

export const Post = (req, res) => {
    const {
        firstName, lastName,address,phone,userName,userPass, idRole,
        idDocumentType, mail,docNumber
    } = req.body;
    encripto.encryptPassword(userPass).then(val => {
        user.create({
            id: 0,firstName: firstName,lastName: lastName,address: address,phone: phone,
            idDocumentType: parseInt(idDocumentType), mail: mail,docNumber: docNumber,state: 1
        }).then(us => {
            user.findOne({
                attributes: ['id', 'firstName', 'lastName', 'creationDate', 'address', 'phone', 'state'],
                where: {
                    mail: mail
                }
            }).then(x => {
                account.create({
                    id: 0, roleId: parseInt(idRole),userId: x.dataValues.id,
                    userName: userName,userPass: val,state: 1
                }).then(p => {
                    res.json({
                        status:  parseInt(process.env.success_code),
                        message: 'El usuario fue creado con exito'
                    });
                })
            })
        });
    });

}

export const Put = (req, res) => {
    const { firstName, lastName, address, phone,idDocumentType,mail,docNumber } = req.body;   
    const { id } = req.params;
    user.update({
        firstName: firstName,lastName: lastName, address: address,
        phone: phone,idDocumentType: parseInt(idDocumentType),
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