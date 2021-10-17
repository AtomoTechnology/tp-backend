import * as encripto from '../Helpers/Cryptographies'
import mysqlconnection from '../DB/db';
const sequelize = require('../DB/db');
const {
    QueryTypes
} = require('sequelize');
const user = require('../DB/models/user');
const account = require('../DB/models/account');

export const GetAll = (req, res) => {
    user.findAll({
        attributes: ['id', 'firstName', 'lastName', 'creationDate', 'address', 'phone', 'state'],
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
        id,
        firstName,
        lastName,
        address,
        phone,
        userName,
        userPass,
        idRole,
        idDocumentType,
        mail,
        docNumber
    } = req.body;
    encripto.encryptPassword(userPass).then(val => {
        user.create({
            id: 0,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            idDocumentType: parseInt(idDocumentType),
            mail: mail,
            docNumber: docNumber,
            state: 1
        }).then(us => {
            user.findOne({
                attributes: ['id', 'firstName', 'lastName', 'creationDate', 'address', 'phone', 'state'],
                where: {
                    mail: mail
                }
            }).then(x => {
                account.create({
                    id: 0,
                    idRole: parseInt(idRole),
                    idUser: x.dataValues.id,
                    userName: userName,
                    userPass: val,
                    state: 1
                }).then(p => {
                    res.json({
                        status: 201,
                        message: 'El usuario fue creado con exito'
                    });
                })
            })
        });
    });

}
export const Put = (req, res) => {
    // const { firstName, lastName, address, phone,idDocumentType,mail,docNumber } = req.body;
    // const { id } = req.params;
    // const query = `
    // CALL CreateOrUpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    // `;
    // mysqlconnection.query(query,[id, firstName, lastName, address, phone,- 1, "-1", "-1",idDocumentType,mail,docNumber], (err, rows, fields) =>{       
    //     if(!err){
    //         res.json({
    //             status: 201,
    //             message:'El usuario fue modificado con exito'
    //         });
    //     }
    //     else{
    //         res.json(err);
    //     }
    // });
}
export const Delete = (req, res) => {
    // const { id } = req.params;
    // mysqlconnection.query('UPDATE users SET state = 2 WHERE id =?',[id], (err, rows, fields) =>{
    //     if(!err){
    //         res.json({
    //             status: 201,
    //             message:'El usuario fue eliminado con exito'
    //         });
    //     }
    //     else{
    //         res.json(err);
    //     }
    // });
}