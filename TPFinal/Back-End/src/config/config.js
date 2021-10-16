
require('dotenv').config();

module.exports = {
    SECRET:'legajosalumnos',
    database:{
        host:process.env.Host,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE,
        insecureAuth : true  
    }
}