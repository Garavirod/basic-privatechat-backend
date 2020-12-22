class Sockets{
    constructor(io){
        this.io=io;
        this.socketEvents();
    }

    socketEvents(){
        // On Connection Where 'socket' is the client connected
        this.io.on('connection', (socket) => {     
            console.log('client connected!!');            
            // Validate JWT
            // If token is no valid, disconnect
            // What user active is ?
            // Emmit all active users
            // Socket Join by uid
            // Hear when a user sends a message
            // Disconnect user an set user off on DBB   
            socket.on('disconnect',( ) => { 

             });
         });
    }
}
module.exports = Sockets;