import mysqlconnection from '../DB/db'; 
require('dotenv').config(); 

const role = require('../DB/models/role');
const auth = require('../DB/models/auth');
const user = require('../DB/models/user');
const location = require('../DB/models/location');
const hanger = require('../DB/models/hanger');
const documenttype = require('../DB/models/documenttype');

require('dotenv').config();
import * as encripto from '../Helpers/Cryptographies';

export const checkUserNameNoneRepeat = (req, res, next) => {
    // console.log("entrando checkUserNameNoneRepeat con userName: ",req.body.userName);
    auth.findAll({
        attributes: ['id', 'userName', 'idUser', 'state'],
        where: {
            userName: req.body.userName
        }
    })
    .then( result =>{
        if (result.length > 0) {
            return res.json({
                status:  parseInt(process.env.error_code),
                title: 'Error validar usuario',
                message: "Nombre usuario existe"
            });
        }
        next();
    });
}

export const checkLocationNoneRepeat = (req, res, next) => {
    location.findAll({
        attributes: ['id', 'name', 'state'],
        where: {
            name: req.body.name
        }
    })
    .then( result =>{
        if (result.length > 0) {
            return res.json({
                status:  parseInt(process.env.error_code),
                title: 'Error ubicación parche',
                message: "Esta ubicación ya existio"
            });
        }
        next();
    }); 
}

export const checkNroHangerNoneRepeat = (req, res, next) => {
    hanger.findAll({
        attributes: ['id', 'nrohanger', 'state'],
        where: {
            nrohanger: req.body.nrohanger
        }
    })
    .then( result =>{
        if (result.length > 0) {
            return res.json({
                status:  parseInt(process.env.error_code),
                title: 'Error validar parche',
                message: "Este nro de parche ya existio"
            });
        }
        next();
    }); 
}

export const checkDocumentNoneRepeat = (req, res, next) => {
    documenttype.findAll({
        attributes: ['id', 'name', 'state'],
        where: {
            name: req.body.name
        }
    })
    .then( result =>{
        if (result.length > 0) {
            return res.json({
                status:  parseInt(process.env.error_code),
                title: 'Error validar documento',
                message: "Este documento ya existio"
            });
        }
        next();
    });  
}

export const checkRoleExisted = (req, res, next) => {
    
    role.findAll({
        attributes: ['id', 'name', 'description', 'state'],
        where: {
            state: 1,
            id: req.body.idRole
        }
    }).then( result =>{
        if(result.length === 0){
            return res.json({
                status:  parseInt(process.env.error_code),
                title: 'Error validar rol',
                message:"Rol no existe"
            });   
        }
        else{
            next();
        }
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error validar rol',
            message:"Rol requiere"
        }); 
    }); 
}

export const checkRoleUpdateExisted = (req, res, next) => {
    role.findAll({
        attributes: ['id', 'name', 'description', 'state'],
        where: {
            state: 1,
            id: !req.body.idRole,
            name: req.role
        }
    }).then( result =>{
        if(result.length > 0){
            return res.json({
                status:  parseInt(process.env.error_code),
                title: 'Error validar rol',
                message:"Hay un rol con ese nombre"
            });   
        }
        else{
            next();
        }
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error validar rol',
            message:"Rol requiere"
        }); 
    });   
}
export const checkDocuUpdateExisted = (req, res, next) => {
    documenttype.findAll({
        attributes: ['id', 'name', 'description', 'state'],
        where: {
            state: 1,
            id: !req.body.idRole,
            name: req.role
        }
    }).then( result =>{
        if(result.length > 0){
            return res.json({
                status:  parseInt(process.env.error_code),
                title: 'Error validar documento',
                message:"Hay documento ya con ese nombre"
            });   
        }
        else{
            next();
        }
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error validar documento',
            message:"Documento requiere"
        }); 
    });     
}

export const checkCorrectChangePass = (req, res, next) => {    
    const { userName, userPass, confirmPass, newUserPass} = req.body;
    auth.findOne({
        attributes: ['id', 'userName','userPass', 'idUser', 'idRole', 'state'],
        where: {
            userName: userName,
            state: 1
        }
    })
    .then( result =>{
        encripto.compare(userPass,result.userPass).then((response)=>
        {
            if(!response){
                return res.json({
                    status: parseInt(process.env.server_notfount_code),
                    error:"No encontrado",                    
                    message:"Contraseña actual es diferente de lo que se ingreso"
                });
            }
            else if(newUserPass !== confirmPass){
                return res.json({
                    status: parseInt(process.env.server_notfount_code),
                    error:"No encontrado",                    
                    message:"Las nuevas contraseña deben ser iguales"
                });
            }
            else{
                console.log("Ingreso en el next then del metodo checkCorrectChangePass ");
                next();
            }
        })
    })
    .catch((err) =>{
        return res.json({
            status: parseInt(process.env.server_notfount_code),
            error:"Error",                    
            message:"No se pude establecer la conexion"
        });
    });   
}

export const isUserValid = (req, res, next) =>{
    if(req.body.userName.length < 6){
        return res.status(401).json({
            error:"No encontrado",                    
            message:"El usuario debe tener al menos 6 caracteres"
        });              
    }
    else if(req.body.userName.length > 50){
        return res.status(401).json({
            error:"No encontrado",                    
            message:"El usuario no puede tener más de 50 caracteres"
        }); 
    }
    else{
        next();
    }
}

export const EmailNoneRepeat = (req, res, next) =>{
    user.findAll({
        attributes: ['id', 'state'],
        where: {
            mail: req.body.mail
        }
    })
    .then( result =>{
        if (result.length > 0) {
            return res.json({
                code: 404,
                error: "error",
                message: "Hay un usuario con ese correo electronico"
            });
        }
        next();
    }); 
}

export const NumDocumentNoneRepeat = (req, res, next) =>{
    
    user.findAll({
        attributes: ['id', 'state'],
        where: {
            state: 1,
            docNumber: req.body.docNumber
        }
    }).then( result =>{
        if(result.length > 0){
            return res.json({
                code: 401, 
                error:"error",
                message:"Hay un usuario con ese numero de documento"
            });   
        }
        else{
            next();
        }
    });   
}

export const PhoneNoneRepeat = (req, res, next) =>{
    user.findAll({
        attributes: ['id', 'state'],
        where: {
            phone: req.body.phone
        }
    })
    .then( result =>{
        if (result.length > 0) {
            return res.json({
                code: 404,
                error: "error",
                message: "Hay un usuario con ese numero de teléfono"
            });
        }
        next();
    }); 
}

export const isPassValid = (req, res, next) =>{
    const { userPass} = req.body;  
    var mayus = /[A-Z]/;
    var minis = /[a-z]/;    
    var num = /[0-9]/;
    
    if(userPass.length < 6){
        return res.status(401).json({
            error:"formato incorrecto",                    
            message:"La clave debe tener al menos 6 caracteres"
        });              
    }
    else if(userPass.length > 50){
        return res.status(401).json({
            error:"formato incorrecto",                    
            message:"La clave no puede tener más de 50 caracteres"
        }); 
    }
    else if(!mayus.test(userPass)){
        return res.status(401).json({
            error:"formato incorrecto",                    
            message:"La clave debe tener al menos una letra mayúscula"
        }); 
    }
    else if(!minis.test(userPass)){
        return res.status(401).json({
            error:"formato incorrecto",                    
            message:"La clave debe tener al menos una letra minúscula"
        }); 
    }
    else if(!num.test(userPass)){
        return res.status(401).json({
            error:"formato incorrecto",                    
            message:"La clave debe tener al menos un caracter numérico"
        }); 
    }
    else{
        next();
    }
}

export const IsmailValid = (req, res, next) => {
    const {mail} = req.body;
    const isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    if(!isEmail.test(mail)){
        return res.status(401).json({
            error:"formato incorrecto",                    
            message:"Esta dirección de correo: " + mail + " no es valida"
        }); 
    }
    else{
        next();
    }
}