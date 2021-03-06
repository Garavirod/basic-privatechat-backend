// Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./Sockets');
const { DBConnection } = require('../database/dbconfig');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // DB connection
        DBConnection();
        // Http server
        this.server = http.createServer(this.app);
        // Settings sokets
        this.io = socketio(this.server);
    }

    middlewares(){
        // Deploy public dir
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        // CORS domian restrictions
        this.app.use(cors());
        // Prasing Body
        this.app.use( express.json() )
        // API's endpoints
        this.app.use('/api/login/',require('../router/auth'));
        this.app.use('/api/messages/',require('../router/messages'));

    }

    settingSockets(){
        new Sockets(this.io);
    }

    initServer(){
        //init middlewares
        this.middlewares(); 
        // Init socket
        this.settingSockets();
        // Init server
        this.server.listen(this.port,()=>{
            console.log(`Server running on port :> ${this.port}`);
        });
    }
}

module.exports = Server;