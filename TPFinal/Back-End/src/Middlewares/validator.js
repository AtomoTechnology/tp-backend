require('dotenv').config(); 

const role = require('../DB/models/role');
const Account = require('../DB/models/account');
const user = require('../DB/models/user');
const location = require('../DB/models/location');
const hanger = require('../DB/models/hanger');
const documenttype = require('../DB/models/documenttype');

require('dotenv').config();
import * as encripto from '../Helpers/Cryptographies';

export const checkUserNameNoneRepeat = (req, res, next) => {
try {
    let data = req.body;
    if(data !== undefined){
        Account.findAll({
            attributes: ['id', 'userName', 'state'],
            where: {
                userName: data.userName
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
    else{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error modelo usuario',
            message: "model usuario incompleto"
        });
    } 
    
} catch (error) {
    return res.json({
        status:  parseInt(process.env.error_code),
        title: 'Error modelo usuario',
        message: error.message
    });
}

       
}

export const checkLocationNoneRepeat = (req, res, next) => {
    try {
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
    } catch (error) {
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error ubicación parche',
            message: process.env.error_unknown
        });
    }
    
}

export const checkNroHangerNoneRepeat = (req, res, next) => {
   try {
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
    })
   } catch (error) {
    return res.json({
        status:  parseInt(process.env.error_code),
        title: 'Error validar parche',
        message: process.env.error_unknown
    });
   }
    ; 
}

export const checkDocumentNoneRepeat = (req, res, next) => {
    try {
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
    } catch (error) {
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error validar documento',
            message: process.env.error_unknown
        });
    }
    
}

export const checkRoleExisted = (req, res, next) => {
    try {
        role.findAll({
            attributes: ['id', 'name', 'description', 'state'],
            where: {
                state: 1,
                id: req.body.roleId
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
        
    } catch (error) {
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error validar rol',
            message: process.env.error_unknown
        }); 
    }
}

export const checkRoleUpdateExisted = (req, res, next) => {
    try {
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
    } catch (error) {
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error validar rol',
            message:process.env.error_unknown
        }); 
    }   
}
export const checkDocuUpdateExisted = (req, res, next) => {
    try {
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
    } catch (error) {
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error validar documento',
            message:process.env.error_unknown
        }); 
    }       
}

export const checkCorrectChangePass = (req, res, next) => {
    try {
        const { userName, userPass, confirmPass, newUserPass} = req.body;
    Account.findOne({
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
                    status: parseInt(process.env.error_code),
                    title:"No encontrado",                    
                    message:"Contraseña actual es diferente de lo que se ingreso"
                });
            }
            else if(newUserPass !== confirmPass){
                return res.json({
                    status: parseInt(process.env.error_code),
                    title:"No encontrado",                    
                    message:"Las nuevas contraseña deben ser iguales"
                });
            }
            else{
                next();
            }
        })
    })
    } catch (error) {
        return res.json({
            status: parseInt(process.env.error_code),
            title:"Error",                    
            message:process.env.error_unknown
        });
    }      
}

export const isUserValid = (req, res, next) =>{
    try {
        if(req.body.userName.length < 6){
            return  res.json({
                status: parseInt(process.env.error_code),
                title:"No encontrado",                    
                message:"El usuario debe tener al menos 6 caracteres"
            });              
        }
        else if(req.body.userName.length > 50){
            return  res.json({
                status: parseInt(process.env.error_code),
                title:"No encontrado",                    
                message:"El usuario no puede tener más de 50 caracteres"
            }); 
        }
        else{
            next();
        }
        
    } catch (error) {
        return  res.json({
            status: parseInt(process.env.error_code),
            title:"No encontrado",                    
            message:process.env.error_unknown
        }); 
    }
}

export const EmailNoneRepeat = (req, res, next) =>{
    try {
        user.findAll({
            attributes: ['id', 'state'],
            where: {
                mail: req.body.mail
            }
        })
        .then( result =>{
            if (result.length > 0) {
                return res.json({
                    status: parseInt(process.env.error_code),
                    title: "error",
                    message: "Hay un usuario con ese correo electronico"
                });
            }
            next();
        });
    } catch (error) {
        return res.json({
            status: parseInt(process.env.error_code),
            title: "error",
            message: process.env.error_unknown
        });
    }
    
}

export const NumDocumentNoneRepeat = (req, res, next) =>{
    try {
        user.findAll({
            attributes: ['id', 'state'],
            where: {
                state: 1,
                docNumber: req.body.docNumber
            }
        }).then( result =>{
            if(result.length > 0){
                return res.json({
                    status: parseInt(process.env.error_code),
                    title:"error validar documento",
                    message:"Hay un usuario con ese numero de documento"
                });   
            }
            else{
                next();
            }
        });
    } catch (error) {
        return res.json({
            status: parseInt(process.env.error_code),
            title:"error validar documento",
            message:process.env.error_unknown
        }); 
    }
       
}

export const isDocumentTypeValid = (req, res, next) =>{
    try {
        documenttype.findAll({
            attributes: ['id', 'state'],
            where: {
                state: 1,
                id: req.body.documentTypeId
            }
        }).then( result =>{
            if(result.length === 0){
                return res.json({
                    status: parseInt(process.env.error_code),
                    title:"error validar documento",
                    message:"Este tipo de documento no existe."
                });   
            }
            else{
                next();
            }
        });
    } catch (error) {
        return res.json({
            status: parseInt(process.env.error_code),
            title:"error validar documento",
            message:process.env.error_unknown
        }); 
    }
       
}


export const PhoneNoneRepeat = (req, res, next) =>{
    try {
        user.findAll({
            attributes: ['id', 'state'],
            where: {
                phone: req.body.phone
            }
        })
        .then( result =>{
            if (result.length > 0) {
                return res.json({
                    status: parseInt(process.env.error_code),
                    title: "error validar teléfono",
                    message: "Hay un usuario con ese numero de teléfono"
                });
            }
            next();
        }); 
    } catch (error) {
        return res.json({
            status: parseInt(process.env.error_code),
            title: "error validar teléfono",
            message: process.env.error_unknown
        });
    }
    
}

export const isPassValid = (req, res, next) =>{
    try {
        let userPass = req.body;  
        var mayus = /[A-Z]/;
        var minis = /[a-z]/;    
        var num = /[0-9]/;

        if(userPass.userPass.length < 6){
            return res.json({
                status: parseInt(process.env.error_code),
                title:"formato incorrecto",                    
                message:"La clave debe tener al menos 6 caracteres"
            });              
        }
        else if(userPass.userPass.length > 50){
            return res.json({
                status: parseInt(process.env.error_code),
                title:"formato incorrecto",                    
                message:"La clave no puede tener más de 50 caracteres"
            }); 
        }
        else if(!mayus.test(userPass.userPass)){
            return res.json({
                status: parseInt(process.env.error_code),
                title:"formato incorrecto",                    
                message:"La clave debe tener al menos una letra mayúscula"
            }); 
        }
        else if(!minis.test(userPass.userPass)){
            return res.json({
                status: parseInt(process.env.error_code),
                title:"formato incorrecto",                    
                message:"La clave debe tener al menos una letra minúscula"
            }); 
        }
        else if(!num.test(userPass.userPass)){
            return res.json({
                status: parseInt(process.env.error_code),
                title:"formato incorrecto",                    
                message:"La clave debe tener al menos un caracter numérico"
            }); 
        }
        else{
            next();
        }
    } catch (error) {
        return res.json({
            status: parseInt(process.env.error_code),
            title:"formato incorrecto",                    
            message:process.env.error_unknown
        });
    }
    
}

export const IsmailValid = (req, res, next) => {
    try {
        let {mail} = req.body;
        const isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        if(!isEmail.test(mail)){
            return res.json({
                status: parseInt(process.env.error_code),
                title:"formato incorrecto",                    
                message:"Esta dirección de correo: " + mail + " no es valida"
            }); 
        }
        else{
            next();
        }
    } catch (error) {
        return res.json({
            status: parseInt(process.env.error_code),
            title:"formato incorrecto",                    
            message:process.env.error_unknown
        }); 
    }
    
}

export const isValidSizeImg = (req, res, next) => {
    try {
        let {img} = req.body;
        console.log("img.toString().length / 1024 ", img.toString().length / 1024)
        
        if((img.toString().length / 1024) > 50){
            return res.json({
                status: parseInt(process.env.error_code),
                title:"formato incorrecto",                    
                message:"La imagen no puede superar 5 MB"
            }); 
        }
        else{
            next();
        }
    } catch (error) {
        return res.json({
            status: parseInt(process.env.error_code),
            title:"formato incorrecto",                    
            message:process.env.error_unknown
        }); 
    }    
}