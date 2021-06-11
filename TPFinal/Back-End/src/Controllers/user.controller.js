import * as encripto from '../Helpers/Cryptographies'
import mysqlconnection from '../DB/db'; 
export const getUser = (req, res) =>{
    mysqlconnection.query('SELECT * FROM users where state = 1',(err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }
        else{
            res.json(err);
        }
    });    
}
export const getUserById = (req, res) =>{    
        const { id } = req.params;
    mysqlconnection.query('SELECT * FROM users where state = 1 and id =?',[id], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }
        else{
            res.json(err);
        }
    });    
}
export const createUser = (req, res) =>{
    const { id, firstName, lastName, address, phone, userName, userPass, idRole,idDocumentType,mail,docNumber } = req.body;
    const query = `
    CALL CreateOrUpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
    const pass = ""; 
    encripto.encryptPassword(userPass).then(val =>{
        mysqlconnection.query(query,[id, firstName, lastName, address, phone, idRole, userName, val,idDocumentType,mail,docNumber], (err, rows, fields) =>{
            if(!err){          
                return res.json({
                    status: 201,
                    message:'El usuario fue guardo con exito'
                });
            }
            else{
                res.json(err);
            }
        });
    });
   
}
export const updateUser = (req, res) =>{
    const { firstName, lastName, address, phone,idDocumentType,mail,docNumber } = req.body;
    const { id } = req.params;
    const query = `
    CALL CreateOrUpdateUser(?, ?, ?, ?, ?, ?, ?, ?);
    `
    mysqlconnection.query(query,[id, firstName, lastName, address, phone,idDocumentType,mail,docNumber], (err, rows, fields) =>{
        if(!err){
            res.json({
                status: 201,
                message:'El usuario fue modificado con exito'
            });
        }
        else{
            res.json(err);
        }
    });
}
export const deleteUser = (req, res) =>{  
    const { id } = req.params;
    mysqlconnection.query('UPDATE users SET state = 2 WHERE id =?',[id], (err, rows, fields) =>{
        if(!err){
            res.json({
                status: 201,
                message:'El usuario fue eliminado con exito'
            });
        }
        else{
            res.json(err);
        }
    });
}