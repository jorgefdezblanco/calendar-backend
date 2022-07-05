/*
    user Routers
    host + /api/auth
*/


const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { create, login, renew } = require('../controllers/auth');
const { validator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');



router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validator,
    ],
    create 
);

router.post(
    '/',
    [
        check('email','el email es obligatorio').isEmail(),
        check('password','el password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validator,
    ],
    login
);

router.get('/renew', validateJWT,renew);



module.exports = router;
