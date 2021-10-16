import * as encripto from '../Helpers/Cryptographies'
import mysqlconnection from '../DB/db'; 
const sequelize = require('../DB/db');
const { QueryTypes } = require('sequelize');
const user = require('../DB/models/user');

export const GetAll = (req, res) =>{    
    user.findAll({
        attributes: ['id', 'firstName', 'lastName', 'creationDate', 'address', 'phone', 'state'],
        where: {
            state: 1
        }
    }).then(result =>{
        res.json(result);
    }) 
    // mysqlconnection.query('SELECT * FROM users where state = 1 ORDER BY id DESC',(err, rows, fields) =>{
    //     if(!err){
    //         res.json(rows);
    //     }
    //     else{
    //         res.json(err);
    //     }
    // });    
}
export const GetById = (req, res) =>{ 
    // console.log("Id usuario: " + req.params.id);   
    //     const { id } = req.params;
    // mysqlconnection.query('SELECT * FROM users where state = 1 and id =?',[id], (err, rows, fields) =>{
    //     if(!err){
    //         res.json(rows[0]);
    //         console.log(rows[0])
    //     }
    //     else{
    //         res.json(err);
    //     }
    // });    
}
export const Post = (req, res) =>{    
    const { id, firstName, lastName, address, phone, userName, userPass, idRole,idDocumentType,mail,docNumber } = req.body;
   console.log("Entrando en el metodo de crear usuar post: ",req.body);
    encripto.encryptPassword(userPass).then(val =>{
        console.log("Encrypta contraseña: ",val);
        sequelize.query('CALL CreateOrUpdateUser :id, :firstName, :lastName,:address, :phone, :idRole,:userName, :userPass, :idDocumentType, :mail, :docNumber)', 
        {replacements: 
            { 
                id: 0, 
                firstName: firstName, 
                lastName: lastName,
                address: address,
                phone: phone,
                idRole: idRole,
                userName: userName,
                userPass: val,
                idDocumentType: idDocumentType,
                mail: mail,
                docNumber: docNumber

            }})
        .then( (response) =>{
            console.log("Devolucion usuario creado: ",response);
        });
    });
   
}
export const Put = (req, res) =>{
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
export const Delete = (req, res) =>{  
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