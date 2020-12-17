const { Router } = require('express');
const { validateJWT } = require('../middlewares/JWTValidate');
const messageController = require('../controllers/message');
const router = Router();


/* PATH: /api/messages */


/* ++++++++++++++++++++++++++++ */
/* +++++++++++ POST +++++++++++ */
/* ++++++++++++++++++++++++++++ */


/* ++++++++++++++++++++++++++++ */
/* +++++++++++ GET ++++++++++++ */
/* ++++++++++++++++++++++++++++ */

router.get('/:from', validateJWT, messageController.getChat);




module.exports = router;