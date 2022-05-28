import express from 'express';
import morgan from 'morgan';
const sequelize = require('../DB/db');
var bodyParser = require('body-parser');

import pkg from '../../package.json';
import helmet from 'helmet';
import cors from 'cors';
require('../DB/associations');

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

// Limit 
app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));
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