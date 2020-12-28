const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {
    return new Promise ( (resolve, reject)=> { 
        const payload = { uid }; //the least infromation the best
        //JWT_KEY is the secret key for code and decode token
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn : '24hr'
        },(err, token ) => {
            if( err ){
                console.log(err);
                reject('JWT cpuld not be generated !');
            }else{
                resolve( token );
            }
        }); 
    })
}


const verifyJWT = ( token = '' ) => {
    try {
        const { uid } =jwt.verify(token,process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false];
    }
}

module.exports = { generateJWT, verifyJWT };