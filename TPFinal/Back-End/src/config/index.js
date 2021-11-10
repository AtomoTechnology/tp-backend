import express from 'express';
import morgan from 'morgan';
const sequelize = require('../DB/db');

import pkg from '../../package.json';
import helmet from 'helmet';
import cors from 'cors';
const app = express();
//Router
import routelist from '../config/list.route';
//Settings
app.set('port',process.env.PORT || 3000)
app.set('pkg',pkg)

//Middlewares
app.use(morgan('dev'));

app.get('/',(req, res) =>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description:app.get('pkg').description,
        version:app.get('pkg').version
    });
});

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

//Routes
app.use(routelist);

//Starting
app.listen(app.get('port'), () =>{
    console.log('server on port',app.get('port'));

    //Connection to bd
    sequelize.sync({force: false}).then( () =>{
        console.log('DB is conected'); 
    }).catch(err =>{
        console.log(err);
        return;
    });
});