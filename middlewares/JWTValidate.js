const jwt = require('jsonwebtoken');

const validateJWT =  (req, res, next) =>{
    try {        
        const token = req.header('x-token'); // this way React has to send token to backend
        // Token does not exist or is invalid
        if( !token ){
            return res.status(401).json({
                ok:false,
                msg: 'user not authorizated' //there is not token on header
            })
        }
        // if token is valid
        const {uid:payload} = jwt.verify(token, process.env.JWT_KEY);
        // Inject on request the payload for using it in other places
        req.uid = payload;
        // Next middleware
        next();
    } catch (e) {
        // Not authorizated
        return res.status(401).json({
            ok:false,
            msg: 'user not authorizated' //token not valid
        })
    }

}


module.exports = { validateJWT };