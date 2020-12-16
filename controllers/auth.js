const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const controllers = {};

/* ++++++++++++++++++++++++++++ */
/* +++++++++++ POST +++++++++++ */
/* ++++++++++++++++++++++++++++ */

/* Register new user */

controllers.registerNewUser = async (req, res) =>{
    try {
        // Data body
        const { email, password, name } = req.body;
        // Verify email existence 
        const emailExist = await User.findOne({email});
        if( emailExist ){
            return res.status(400).json(
                {
                    ok:false,
                    msg:'mail already exiist',

                }
            )
        }

        // Create a user instance
        const user = new User( req.body );

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Save user on DB
        await user.save();

        // Generate JWT
        const token = await generateJWT( user.id );


        // Response
        res.status(200).json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok:false,
                msg: 'Calls for the administrator'
            }
        );
    }
};

/* Login */

controllers.login = async(req, res) =>{
    
    const { email, password } = req.body;


    try {
        // Verify if user exist
        const userDB = await User.findOne({email});        
        if( !userDB ){
            return res.status(404).json({ok:false, msg:'User not exist'});
        }

        // Verify password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if( !validPassword ){
            return res.status(400).json({ok:false, msg:'Incorrect credentials'});
        }

        // Generate JWT
        const token = await generateJWT( userDB.id );

        // Response
        res.status(200).json({
            ok:true,
            user: userDB,
            token:token       
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok:false,
                msg: 'Calls for the administrator'
            }
        );
    }
};

/* Revalidate token */
controllers.revalidateToken = async (req,res) =>{
    res.json({
        ok:true,
        user:'RENEW',
    })
};


module.exports = controllers;