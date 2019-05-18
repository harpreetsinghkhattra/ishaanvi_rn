import Palette from './Palette';
import EventEmitter from 'EventEmitter';
import React, { PureComponent } from 'react';
import {
    View,
    Dimensions,
    Platform,
    StatusBar,
    ToastAndroid,
    Alert,
    AsyncStorage,
    Linking,
    NativeModules
} from 'react-native';
import PropTypes from 'prop-types';
import { MemoryRouter, BackButton } from 'react-router-native'
import { User } from './model/user';
import { ConnectionInfoBar } from './components/Card/Home'
import firebase from 'react-native-firebase';
import { EventNotificationinfo } from './scenes/Modal';
import MainScene from './scenes/MainScene';

const PORTRAIT = 0;
const LANDSCAPE = 1;

class Rootrn extends PureComponent {

    constructor(props) {
        super(props);
        this._orientationEventEmitter = new EventEmitter();
        this.state = {
            booted: false,
            orientation: null,
            viewableScreenWidth: null,
            viewableScreenHeightWithHeader: null,
            viewableScreenHeight: null,
            screenWidth: null,
            screenHeight: null,
            scale: null,
            fontScale: null,
            isSocketConnected: true,
            userHasActivatedCallback: null,
            alertNotificationMessageVisible: false,
            selectedNotification: {},
            productNotificationData: null,
            deviceToken: null
        };
    }

    componentWillMount() {

        // Get some initial size data
        const width = Math.round(Dimensions.get('window').width);
        const height = Math.round(Dimensions.get('window').height);
        const scale = Dimensions.get('window').scale;
        const fontScale = Dimensions.get('window').fontScale;

        // Set to state
        this.setState({
            screenWidth: width,
            screenHeight: height,
            orientation: width > height ? LANDSCAPE : PORTRAIT,
            scale: scale,
            fontScale: fontScale
        });
    }

    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("requestBody ===> fcm token checking", fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                console.log("requestBody ===> fcm token", fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }

        this.setState({
            deviceToken: fcmToken
        })
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners(); //add this line
    }

    ////////////////////// Add these methods //////////////////////

    //Remove listeners allocated in createNotificationListeners()
    componentWillUnmount() {
        // this.notificationListener();
        // this.notificationOpenedListener();
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            console.log("NOTIFICATION ===> FOURGROUND", notification);
            // this.showAlert(title, body);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { data, notificationId } = notificationOpen.notification;
            console.log("NOTIFICATION ===> BACKGROUND notificationId", notificationId);
            firebase.notifications().removeDeliveredNotification(notificationId);
            
            if (data && data.notification_type === "product") {
                this.setState({
                    productNotificationData: data
                })
                return;
            }

            this.setState({
                alertNotificationMessageVisible: true,
                selectedNotification: {
                    title: data.title,
                    description: data.description
                }
            })
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { data, notificationId } = notificationOpen.notification;
            console.log("NOTIFICATION ===> CLOSED", notificationId);

            firebase.notifications().removeDeliveredNotification(notificationId);

            if (data && data.notification_type === "product") {
                this.setState({
                    productNotificationData: data
                })
                return;
            }

            this.setState({
                alertNotificationMessageVisible: true,
                selectedNotification: {
                    title: data.title,
                    description: data.description
                }
            })
            // this.showAlert(title, body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage(({ data }) => {

            if (data && data.notification_type === "product") {
                return;
            }

            //process data message
            this.setState({
                alertNotificationMessageVisible: true,
                selectedNotification: {
                    title: data.title,
                    description: data.description
                }
            })
        });

        firebase.messaging().subscribeToTopic("ishaanvi_events");
    }

    showAlert(title, body) {
        Alert.alert(
            title, body,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    _onScreenUpdate(event) {
        console.log("screen update", event.nativeEvent);
        const width = Math.round(event.nativeEvent.layout.width);
        const height = Math.round(event.nativeEvent.layout.height);
        const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
        if (orientation !== this.state.orientation) {
            // emit orientation change event
            this._orientationEventEmitter.emit('orientation');
        }
        if (
            this.state.viewableScreenWidth !== width
        ) {
            this.setState({
                viewableScreenWidth: width,
                viewableScreenHeightWithHeader: height - this.headerHeight(),
                viewableScreenHeight: height,
                orientation: orientation
            });
        }
    }

    /**
     * Get header height
     */
    headerHeight() {
        return Platform.OS === 'ios' ? 64 : 56;
    }

    isSocketConnected = (isSocketConnected) => {
        this.setState({ isSocketConnected });
    }

    alertMessageVisible = (alertNotificationMessageVisible, selectedNotification) => {
        this.setState({ alertNotificationMessageVisible, selectedNotification });;
    }

    resetProductNotificationData = () => {
        this.setState({
            productNotificationData: null
        })
    }

    render() {
        const { alertNotificationMessageVisible, selectedNotification, productNotificationData, deviceToken } = this.state;

        return (
            <MemoryRouter>
                <View
                    onLayout={(event) => this._onScreenUpdate(event)}
                    style={{
                        flex: 1,
                        backgroundColor: Palette.white
                    }}
                >
                    <BackButton />
                    <StatusBar hidden={false} backgroundColor={Palette.theme_color} />
                    <EventNotificationinfo
                        {...this.props}
                        screenWidth={this.state.viewableScreenWidth}
                        screenHeight={this.state.viewableScreenHeight}
                        isVisible={alertNotificationMessageVisible}
                        title={selectedNotification && selectedNotification.title ? selectedNotification.title : ''}
                        description={selectedNotification && selectedNotification.description ? selectedNotification.description : ''}
                        setVisible={this.alertMessageVisible.bind(this, false, {})}
                    />
                    {React.createElement(MainScene, {
                        booted: this.state.booted,
                        isSocketConnected: this.state.isSocketConnected,
                        isNotificationAlertInRoot: alertNotificationMessageVisible,
                        screenWidth: this.state.viewableScreenWidth,
                        screenHeight: this.state.viewableScreenHeight,
                        screenHeightWithHeader: this.state.viewableScreenHeightWithHeader,
                        screenOrientation: this.state.screenOrientation,
                        scale: this.state.scale,
                        fontScale: this.state.fontScale,
                        productNotificationData: productNotificationData,
                        deviceToken: deviceToken,
                        resetProductNotificationData: this.resetProductNotificationData.bind(this)
                    })}
                    <ConnectionInfoBar
                        onSocketConnectionStatusChange={v => this.isSocketConnected(v)}
                    />
                </View>
            </MemoryRouter>
        );
    }
}

export default Rootrn = Rootrn;
