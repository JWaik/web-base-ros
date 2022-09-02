import React, {Component} from "react";
import Container from 'react-bootstrap/Container';

//import http from 'http';
//import socketIO from 'socket.io';

class Server extends Component{
    state = { }

    Init_server(){
        const webSocketsServerPort = 8000;
        const webSocketServer = require('websocket').server;
        const http = require('http');
// Spinning the http server and the websocket server.
        const server = http.createServer();
        server.listen(webSocketsServerPort);
        const wsServer = new webSocketServer({
        httpServer: server
});
    }

    render(){
        return(
        <Container className="text-center"> {/* Move text to center */}
        <p>JWaik &copy; 2022</p>
        </Container>
        );
    }
}
export default Server;