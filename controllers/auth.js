const controllers = {};

/* POST */

/* Register new user */

controllers.registerNewUser = async(req, res) =>{
    res.json({
        ok:true,
        user:'GAR',
    })
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