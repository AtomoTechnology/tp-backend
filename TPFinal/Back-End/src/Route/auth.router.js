import express from 'express';
import {authjwt, validator} from '../Middlewares'
import * as authcontroller from '../Controllers/auth.controller';
const router = express.Router();

router.get('/:',[authjwt.verifyToken, authjwt.isAdmin],authcontroller.GetAll);
router.get('/:id',[authjwt.verifyToken],authcontroller.GetById);
router.post('/',authcontroller.SignIn);
router.put('/:id',[authjwt.verifyToken,validator.checkCorrectChangePass],authcontroller.Put);

module.exports = router;