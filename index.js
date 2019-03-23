/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
const IO = require('socket.io-client/dist/socket.io');
import { Socket } from './src/api/Socket';
import { User } from './src/model/user';
import bgMessaging from './src/bgMessaging';
import firebase from 'react-native-firebase';

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

// firebase.notifications().getInitialNotification().then((notificationOpen, notificationOpen1) => {
//     console.log("NOTIFICATION ===> git initial", notificationOpen, notificationOpen1); 
// })

// firebase.notifications().onNotificationOpened((notificationOpen) => {
//     const { title, body } = notificationOpen.notification;
//     console.log("NOTIFICATION ===> on notification oppended", notificationOpen);
// });

const client = new Socket(socket);

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask("RNFirebaseBackgroundMessage", () => bgMessaging); // <-- Add this line  