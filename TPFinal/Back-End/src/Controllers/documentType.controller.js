import mysqlconnection from '../DB/db'; 
export const GetALl = (req, res) =>{
    mysqlconnection.query('SELECT * FROM documenttypes where state = 1 ORDER BY id DESC',(err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }
        else{
            res.json(err);
        }
    });    
}
export const GetById = (req, res) =>{    
        const { id } = req.params;
    mysqlconnection.query('SELECT * FROM documenttypes where state = 1 and id =?',[id], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }
        else{
            res.json(err);
        }
    });    
}
export const Post = (req, res) =>{
    const { name, description} = req.body;
    const query = "INSERT INTO documenttypes (name, description, state) VALUES ?";
    var values = [[name, description, 1]];
    
    mysqlconnection.query(query,[values], (err, rows, fields) =>{
        if(!err){          
            return res.json({
                status: 201,
                message:'El tipo de documento fue guardo con exito'
            });
        }
        else{
            return res.json(err);
        }
    });
   
}
export const Put = (req, res) =>{
    const { name, description } = req.body;
    const { id } = req.params;   
    mysqlconnection.query(`UPDATE documenttypes SET name = '${name}',description = '${description}' WHERE id =${[id]}`, (err, rows, fields) =>{
        if(!err){
            res.json({
                status: 201,
                message:'El tipo de documento fue modificado con exito'
            });
        }
        else{
            return res.json(err);
        }
    });
}
export const Delete = (req, res) =>{  
    const { id } = req.params;
    mysqlconnection.query('UPDATE documenttypes SET state = 2 WHERE id =?',[id], (err, rows, fields) =>{
        if(!err){
            res.json({
                status: 201,
                message:'El tipo de documento fue eliminado con exito'
            });
        }
        else{
            return res.json(err);
        }
    });
}