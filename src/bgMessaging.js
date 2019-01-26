import firebase from 'react-native-firebase';

export default async (message) => {
    // handle your message
    console.log("NOTIFICATION ===> BgMessage", message);

    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //     console.log("NOTIFICATION ===> CLOSED", notificationOpen.notification);
    // }
    /*
    * Triggered for data only payload in foreground
    * */
    // this.messageListener = firebase.messaging().onMessage((message) => {
    //     //process data message
    //     console.log("NOTIFICATION ===> CLOSED Done", JSON.stringify(message));
    // });

    // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //     const { title, body } = notificationOpen.notification;
    //     console.log("NOTIFICATION ===> BACKGROUND", notificationOpen);
    //     this.showAlert(title, body);
    // });


    return Promise.resolve();
}