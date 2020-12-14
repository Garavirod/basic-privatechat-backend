const { Router } = require('express');
const authController = require('../controllers/auth');
const { check } = require('express-validator');
const router = Router();

router.post('/new-user',authController.registerNewUser);
router.post('/',[
    check('email','It is necessary an email').isEmail(),
    check('password','It is necessary a password').not().isEmpty()
],authController.login);
router.get('/renew',authController.revalidateToken);


module.exports = router;