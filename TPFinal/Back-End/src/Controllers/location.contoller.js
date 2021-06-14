import mysqlconnection from '../DB/db'; 
export const getLocation = (req, res) =>{
    mysqlconnection.query('SELECT * FROM locations where state = 1 ORDER BY id DESC',(err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }
        else{
            res.json(err);
        }
    });    
}
export const getLocationById = (req, res) =>{    
        const { id } = req.params;
    mysqlconnection.query('SELECT * FROM locations where state = 1 and id =?',[id], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }
        else{
            res.json(err);
        }
    });    
}
export const createLocation = (req, res) =>{
    const { name, description} = req.body;
    const query = "INSERT INTO locations (name, description, state) VALUES ?";
    var values = [[name, description, 1]];
    
    mysqlconnection.query(query,[values], (err, rows, fields) =>{
        if(!err){          
            return res.json({
                status: 201,
                message:'La ubicación fue guarda con exito'
            });
        }
        else{
            return res.json(err);
        }
    });
   
}
export const updateLocation = (req, res) =>{
    const { name, description } = req.body;
    const { id } = req.params;   
    mysqlconnection.query(`UPDATE locations SET name = '${name}',description = '${description}' WHERE id =${[id]}`, (err, rows, fields) =>{
        if(!err){
            res.json({
                status: 201,
                message:'La ubicación fue modificada con exito'
            });
        }
        else{
            res.json({
                status: 301,
                message:'La ubicación no fue modificada con exito'
            });
        }
    });
}
export const deleteLocation = (req, res) =>{  
    const { id } = req.params;
    mysqlconnection.query('UPDATE locations SET state = 2 WHERE id =?',[id], (err, rows, fields) =>{
        if(!err){
            res.json({
                status: 201,
                message:'La ubicación fue eliminada con exito'
            });
        }
        else{
            res.json({
                status: 301,
                message:'La ubicación no fue eliminada con exito'
            });
        }
    });
}