import {Router} from 'express';
import {authjwt, validator} from '../Middlewares'
import * as locationcontroller from '../Controllers/location.contoller';
const router = Router();

//Get All user
router.get('/',locationcontroller.getLocation);

//Get by id
router.get('/:id', locationcontroller.getLocationById);

//Create
router.post('/',[validator.checkLocationNoneRepeat],locationcontroller.createLocation);

//Update
router.put('/:id',[authjwt.verifyToken, authjwt.isAdmin], locationcontroller.updateLocation);

//Delete
router.delete('/:id',[authjwt.verifyToken, authjwt.isAdmin], locationcontroller.deleteLocation);

module.exports = router;