const Message = require('../models/Message');
const controller = {};


controller.getChat = async (req, res) =>{
    const userId = req.uid; //user id 
    const messageFrom = req.params.from; // Who messages comes from

    // Recover las 30 messages
    const messages = await Message.find({
        // conditional OR 
        $or: [
            {
                from: userId, to:messageFrom
            },
            {
                from: messageFrom, to:userId
            }
        ]
    })
    .sort({createdAt:'asc'})
    .limit(30);

    res.json({ok:true, mes:messages});
};

module.exports = controller;