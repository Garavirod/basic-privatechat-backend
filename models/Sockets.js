class Sockets{
    constructor(io){
        this.io=io;
        this.socketEvents();
    }

    socketEvents(){
        // On Connection Where 'socket' is the client connected
        this.io.on('connection', (socket) => {                 
            // Events on 'msg-to-server'
            socket.on('msg-to-server',(mess)=>{
                console.log(mess);
                // If we change io by socket we emit data for all and socket is just for the instance
                this.io.emit('msg-server',mess);
            });

         });
    }
}

module.exports = Sockets;