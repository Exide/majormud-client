import { Server } from 'net';

const server = new Server();

server.on('connection', (socket) => {

});

server.on('error', (error) => {

});

server.listen(23, '0.0.0.0');
