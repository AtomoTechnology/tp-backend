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