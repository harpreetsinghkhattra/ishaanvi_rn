/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
const IO = require('socket.io-client/dist/socket.io');
import { Socket } from './src/api/Socket';

const socket = IO('http://13.127.188.164', {
    transports: ['websocket']
}); 
const client = new Socket(socket);

AppRegistry.registerComponent(appName, () => App);
