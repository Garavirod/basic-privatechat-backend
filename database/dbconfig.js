const mongoose = require('mongoose');
const DBConnection = async () =>{
    try{
        /* 
            this is asyncrunus petition, so 'await' is for wait until
            process be done.
        */
        await mongoose.connect(process.env.STRING_BDD_CONN,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true
        });

        /* if all goes well */
        console.log('DBB Connected succesfully!');

    }catch(err){
        throw new Error('ERROR ON DATABASE ~ LOOK THE LOGS');
    }
}


module.exports = {DBConnection};