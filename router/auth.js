const { Router } = require('express');
const authController = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/FieldValidators');
const router = Router();


/* ++++++++++++++++++++++++++++ */
/* +++++++++++ POST +++++++++++ */
/* ++++++++++++++++++++++++++++ */

// Calls for 'New user controller'
router.post('/new-user',[
    check('email','It is necessary an email').isEmail(),
    check('password','It is necessary a password').not().isEmpty(),
    check('name','It is necessary a name').not().isEmpty(),
    fieldValidators //if all goes wrong, controller will never be called it.
],
authController.registerNewUser);
// Calls for 'Login controller'
router.post('/',[
    check('email','It is necessary an email').isEmail(),
    check('password','It is necessary a password').not().isEmpty(),
    fieldValidators //if all goes wrong, controller will never be called it.
],authController.login);

/* ++++++++++++++++++++++++++++ */
/* +++++++++++ GET ++++++++++++ */
/* ++++++++++++++++++++++++++++ */
router.get('/renew',authController.revalidateToken);


module.exports = router;