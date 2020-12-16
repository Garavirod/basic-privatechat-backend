const User = require('../models/User');
const bcrypt = require('bcryptjs');
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


        // response
        res.status(200).json({
            email,password, name
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
    res.json({
        ok:true,
        user:'LOGIN',
        body:{email, password}
    })
};

/* Revalidate token */
controllers.revalidateToken = async (req,res) =>{
    res.json({
        ok:true,
        user:'RENEW',
    })
};


module.exports = controllers;