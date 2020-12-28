const User = require('../models/User');


const userLogged = async ( uid ) => {
    const user = await User.findById( uid ); //get user
    user.online = true; //set active user
    await user.save() //save data
    return user; 
}

const userLogOut = async ( uid ) => {
    const user = await User.findById( uid ); //get user
    user.online = false; //set active user
    await user.save() //save data
    return user; 
}


module.exports = { userLogged, userLogOut }