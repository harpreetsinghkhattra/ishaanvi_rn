import firebase from 'react-native-firebase';
import Pallete from './Palette';

export default async (message) => {
    // handle your message
    // console.log("NOTIFICATION ===> BgMessag", message);
    const notificationId = `${new Date().getTime()}`;
    const { title, description } = message.data;

    const notification = new firebase.notifications.Notification()
        .setNotificationId(notificationId)
        .setTitle(title)
        .setBody(description)
        .setSound(firebase.notifications.Android.Defaults.Sound)
        .setData({
            title: title,
            description: description
        }); 

    notification
        .android.setChannelId('channelId')
        .android.setAutoCancel(true)  
        .android.setLargeIcon("@mipmap/ic_launcher")
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setColor(Pallete.theme_color)
        .android.setVibrate([1000])
        .android.setCategory("alarm")
        .android.setSmallIcon('@drawable/ic_action_logo');

    firebase.notifications().displayNotification(notification);

    return Promise.resolve();
}