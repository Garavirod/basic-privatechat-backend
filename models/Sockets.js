const { userLogged, userLogOut } = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");

class Sockets{
    constructor(io){
        this.io=io;
        this.socketEvents();
    }

    socketEvents(){
        // On Connection Where 'socket' is the client connected
        this.io.on('connection', async (socket) => {     
            // Identifying logged socket
            const [isValid, uid=null] = verifyJWT(socket.handshake.query['x-token']);
            // If token is no valid, disconnect
            if (!isValid) {
                console.log('socket was not identifyed');
                socket.disconnect();
                return;                 
            }
            // What user active is ?
            await userLogged(uid);                      
            // Validate JWT
            // Emmit all active users
            // Socket Join by uid
            // Hear when a user sends a message
            // Disconnect user an set user off on DBB   
            socket.on('disconnect', async () => { 
                await userLogOut(uid);
                console.log('client disconnect ', uid);
            });
         });
    }
}
module.exports = Sockets;