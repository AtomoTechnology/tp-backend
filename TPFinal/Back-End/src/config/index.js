import express from 'express';
import morgan from 'morgan';
const sequelize = require('../DB/db');
// Start call Route
import userRoute from '../Route/user.route';
import authRoute from '../Route/auth.router';
import locationRoute from '../Route/location.router';
import documentTypeRoute from '../Route/documentType.router';
import roleRoute from '../Route/role.router';
// End call Route
import pkg from '../../package.json';
import helmet from 'helmet';
import cors from 'cors';
const app = express();

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
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/locations', locationRoute);
app.use('/api/v1/documenttypes', documentTypeRoute);
app.use('/api/v1/roles', roleRoute);

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