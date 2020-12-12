const { Router } = require('express');
const authController = require('../controllers/auth');
const router = Router();

router.post('/new-user',authController.registerNewUser);
router.post('/',authController.login);
router.get('/renew',authController.revalidateToken);


module.exports = router;