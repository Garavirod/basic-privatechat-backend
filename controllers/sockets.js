const User = require('../models/User');
const Message = require('../models/Message');


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

const getUsers = async (  ) => {
    const users = await User.find().sort('-online');
    return users;
}

const saveMessage = async ( payload ) => {
    try {
        const message = new Message( payload );
        await message.save();
        return message;
    } catch (error) {
        console.log("Message was not saved! ",error);
        return false;
    }
}

module.exports = { userLogged, userLogOut, getUsers, saveMessage }