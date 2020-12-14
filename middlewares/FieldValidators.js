const { validationResult } = require("express-validator");

const fieldValidators = (req,res,next) =>{
    const errors =  validationResult( req );
    if(!errors.isEmpty()){
        return res.status(400).json(
            {
                success:false,
                errors: errors.mapped()
            }
        );
    }else{
        next(); //call next middleware
    }

};

module.exports = {fieldValidators};