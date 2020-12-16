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

module.exports = { generateJWT };