import {Router} from 'express';
import {authjwt, validator} from '../Middlewares'
import * as ctrl from '../Controllers/user.controller';
const router = Router();

//Get All user
router.get('/',[authjwt.verifyToken],ctrl.GetAll);

//Get by id
router.get('/:id',[authjwt.verifyToken], ctrl.GetById);

//Create
router.post('/',[
    validator.checkUserNameNoneRepeat,
    validator.checkRoleExisted,validator.isUserValid,validator.isPassValid,
    validator.IsmailValid, validator.EmailNoneRepeat, validator.NumDocumentNoneRepeat,
    validator.PhoneNoneRepeat, validator.isDocumentTypeValid
    ],ctrl.Post);

//Update
router.put('/:id',[authjwt.verifyToken, authjwt.isAdmin,validator.checkRoleExisted, validator.IsmailValid], ctrl.Put);

//Delete
router.delete('/:id',[authjwt.verifyToken, authjwt.isAdmin], ctrl.Delete);

module.exports = router;