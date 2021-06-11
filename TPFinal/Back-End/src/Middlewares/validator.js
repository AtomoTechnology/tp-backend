import mysqlconnection from '../DB/db'; 

export const checkUserNameNoneRepeat = (req, res, next) => {
    mysqlconnection.query('SELECT * FROM accounts where userName =?',[req.body.userName], (err, rows, fields) =>{         
        if(rows.length > 0){
            return res.status(400).json({
                error:"error",
                message:"Nombre usuario existe"
            });  
        }
        else{
            next();
        }
    });  
}

export const checkLocationNoneRepeat = (req, res, next) => {
    mysqlconnection.query('SELECT * FROM locations where name =?',[req.body.name], (err, rows, fields) =>{         
        if(rows.length > 0){
            return res.status(400).json({
                error:"error",
                message:"Esta ubicación ya existio"
            });  
        }
        else{
            next();
        }
    });  
}

export const checkDocumentNoneRepeat = (req, res, next) => {
    mysqlconnection.query('SELECT * FROM accounts where name =?',[req.body.name], (err, rows, fields) =>{         
        if(rows.length > 0){
            return res.status(400).json({
                error:"error",
                message:"Este documento ya existio"
            });  
        }
        else{
            next();
        }
    });  
}

export const checkRoleExisted = (req, res, next) => {
    if(req.body.idRole){
        mysqlconnection.query('SELECT * FROM roles WHERE state =?  and id =?',[1, req.body.idRole], (err, rows, fields) =>{     
                       
            if(rows.length === 0){
                return res.status(400).json({
                    error:"error",
                    message:"Rol no existe"
                });   
            }
            else{
                next();
            }
        });  
    }
    else{
        return res.status(401).json({
            error:"error",
            message:"Rol requiere"
        }); 
    }
}
export const checkRoleUpdateExisted = (req, res, next) => {
    if(req.body.idRole){
        mysqlconnection.query('SELECT * FROM roles WHERE state =?  and id !=? name =?',[1, req.idRole, req.role], (err, rows, fields) =>{     
                       
            if(rows.length === 0){
                return res.status(400).json({
                    error:"error",
                    message:"Rol no existe"
                });   
            }
            else{
                next();
            }
        });  
    }
    else{
        return res.status(401).json({
            error:"error",
            message:"Rol requiere"
        }); 
    }
}
export const checkDocuUpdateExisted = (req, res, next) => {
    if(req.body.idRole){
        mysqlconnection.query('SELECT * FROM documenttypes WHERE state =?  and id !=? and name =?',[1, req.body.id, req.body.name], (err, rows, fields) =>{     
                       
            if(rows.length > 0){
                return res.status(400).json({
                    error:"error",
                    message:"Hay documento ya con ese nombre"
                });   
            }
            else{
                next();
            }
        });  
    }
    else{
        return res.status(401).json({
            error:"error",
            message:"Rol requiere"
        }); 
    }
}



export const checkCorrectChangePass = (req, res, next) => {    
    const { userName, userPass, olduserPass} = req.body;
    mysqlconnection.query('SELECT * FROM accounts where userName =?',[userName], (err, rows, fields) =>{   
        if(!err){
            const userfound = rows[0];
            if(!userfound)
            {
                return res.status(400).json({
                    error:"No encontrado",                    
                    message:"Usuario incorrecto"
                });
            }
            else{
                const pass = encripto.compare(olduserPass,userfound.userPass);
                if(!pass){
                    return res.status(401).json({
                        error:"No encontrado",                    
                        message:"contraseña actual incorrecta"
                    });
                }
                else{
                    next();
                }
            }
        }  
        else{
            return res.status(400).json({
                error:"Error",                    
                message:"No se pude establecer la conexion"
            });
        }    
        
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

// export const isUserValid = (req, res, next) =>{
//     if(req.body.userName.length < 6){
//         return res.status(401).json({
//             error:"formato incorrecto",                    
//             message:"El usuario debe tener al menos 6 caracteres"
//         });              
//     }
//     else if(req.body.userName.length > 50){
//         return res.status(401).json({
//             error:"formato incorrecto",                    
//             message:"El usuario no puede tener más de 50 caracteres"
//         }); 
//     }
//     else{
//         next();
//     }
// }

export const isPassValid = (req, res, next) =>{
    const { userPass} = req.body;

    var mayus = new RegExp("/^[A-Z]{1,}$/");
    var minis = new RegExp("/^[a-z]{1,}$");    
    var num = new RegExp("/^[0-9]{1,}$");
    
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
    else if(!userPass.test(mayus)){
        return res.status(401).json({
            error:"formato incorrecto",                    
            message:"La clave debe tener al menos una letra mayúscula"
        }); 
    }
    else if(!userPass.test(minis)){
        return res.status(401).json({
            error:"formato incorrecto",                    
            message:"La clave debe tener al menos una letra minúscula"
        }); 
    }
    else if(!userPass.test(num)){
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
    const mail = req.body.mail;
    const isEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(!mail.test(isEmail)){
        return res.status(401).json({
            error:"formato incorrecto",                    
            message:"Esta dirección de correo: " + mail + " no es valida"
        }); 
    }
    else{
        next();
    }
}