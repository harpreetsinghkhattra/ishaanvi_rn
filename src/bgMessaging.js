import firebase from 'react-native-firebase';
import Pallete from './Palette';

export default async (message) => {
    // handle your message
    // console.log("NOTIFICATION ===> BgMessag", message);
    const notificationId = `${new Date().getTime()}`;
    const { title, description, image } = message.data;

    const notification = new firebase.notifications.Notification()
        .setNotificationId(notificationId)
        .setTitle(title)
        .setBody(description)
        .setSound('default')
        .setData(Object.assign({
            title: title,
            description: description
        }, message.data));

    notification
        .android.setChannelId('channelId')
        .android.setAutoCancel(true)
        .android.setLargeIcon("@mipmap/ic_launcher")
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setColor(Pallete.theme_color)
        .android.setVibrate([400, 1000])
        .android.setSmallIcon('@drawable/ic_action_logo');

    if (image) {
        notification.android.setBigPicture(image)
    }

    firebase.notifications().displayNotification(notification);

    return Promise.resolve();
}