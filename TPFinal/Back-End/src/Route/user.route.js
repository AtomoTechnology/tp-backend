import {Router} from 'express';
import {authjwt, validator} from '../Middlewares'
import * as usercontroller from '../Controllers/user.controller';
const router = Router();

//Get All user
router.get('/',usercontroller.getUser);

//Get by id
router.get('/:id', usercontroller.getUserById);

//Create
// ,validator.isUserValid,validator.isPassValid, validator.IsmailValid
router.post('/',[authjwt.verifyToken,validator.checkUserNameNoneRepeat,validator.checkRoleExisted],usercontroller.createUser);

//Update
router.put('/:id',[authjwt.verifyToken, authjwt.isAdmin,validator.checkRoleExisted, validator.IsmailValid], usercontroller.updateUser);

//Delete
router.delete('/:id',[authjwt.verifyToken, authjwt.isAdmin], usercontroller.deleteUser);

module.exports = router;