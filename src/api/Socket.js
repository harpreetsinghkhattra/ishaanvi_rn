import { User } from './';

var clientSocket;
export class Socket {

    constructor(io) {
        clientSocket = io;

        new User(io);
    }

    static request = (url, body) => {
        clientSocket.emit(url, body);
    }
}