import express from 'express';
import {authjwt, validator} from '../Middlewares'
import * as authcontroller from '../Controllers/auth.controller';
const router = express.Router();

 router.post('/',authcontroller.SignIn);
 router.get('/:id',[authjwt.verifyToken],authcontroller.GetById);
 router.put('/',[authjwt.verifyToken,validator.checkCorrectChangePass],authcontroller.Put);

module.exports = router;