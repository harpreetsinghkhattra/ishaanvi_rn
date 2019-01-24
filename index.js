/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
const IO = require('socket.io-client/dist/socket.io');
import { Socket } from './src/api/Socket';
import { User } from './src/model/user';

const socket = IO('http://13.127.188.164', {
    transports: ['websocket']
});

socket.on("connect", () => {
    console.log("CHAT CONNECTED HIt");
    // alert(User.getUserData()._id);
    if (User.getUserData()._id)
        socket.emit("/socket/api/saveUser", {
            id: User.getUserData()._id
        });
});

const client = new Socket(socket);

AppRegistry.registerComponent(appName, () => App);
