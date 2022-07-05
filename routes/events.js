/*
    events Routers
    host + /api/events
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();
const {createEvent, deleteEvent, getEvents, updateEvent} = require('../controllers/events');
const { validator } = require('../middlewares/fields-validator');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');


router.use( validateJWT );


router.get('/', getEvents );

router.post(
    '/',
    [
        check("title", "el titulo es requerido").not().isEmpty(),
        check("start", "Fecha inicio es oblogatoria").custom( isDate ),
        check("end", "Fecha final es oblogatoria").custom( isDate ),
        validator
    ],
    createEvent
);

router.put(
    '/:id',
    [
    
        check("title", "el titulo es requerido").not().isEmpty(),
        check("start", "Fecha inicio es oblogatoria").custom( isDate ),
        check("end", "Fecha final es oblogatoria").custom( isDate ),
        validator
    
    ], 
    updateEvent );

router.delete('/:id', deleteEvent );



module.exports = router;