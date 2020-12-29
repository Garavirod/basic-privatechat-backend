const { userLogged, userLogOut, getUsers, saveMessage } = require("../controllers/sockets");
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
                // Validate JWT
                console.log('socket was not identifyed');
                socket.disconnect();
                return;                 
            }
            // What user active is ?
            await userLogged(uid);                      
            // Socket Join room by uid
            socket.join( uid )// join socket conn to room with room's name uid
            // Emmit all active users
            this.io.emit('lista-users', await getUsers()); //await beacuse it's a promise
            // Hear when a user sends a message
            socket.on('personal-message', async ( payload ) => {
                const message = await saveMessage( payload );
                // Send message to person in room chat with name 'uid' (to)
                this.io.to(payload.to).emit('personal-message',{message});
                this.io.to(payload.from).emit('personal-message',{message});
            });
            // Disconnect user an set user off on DBB   
            socket.on('disconnect', async () => { 
                await userLogOut(uid);
                console.log('client disconnect ', uid);
                this.io.emit('lista-users', await getUsers()); //await beacuse it's a promise

            });
         });
    }
}
module.exports = Sockets;