import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, Image } from 'react-native'
import { WRow, WView, WText, WSpinner, WTouchable } from '../../common'
import Palette from '../../../Palette'
import { EventNotificationinfo } from '../../../scenes/Modal'
import { User } from '../../../model/user';
import { getAllNotifications } from '../../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../../api';
import moment from 'moment';

export default class NotificationsList extends PureComponent {

    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
            isLoading: true,
            selectedNotification: {},
            alertMessageVisible: false
        }

        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillMount = () => {
        this.init();
    }


    _setState = (value, cb) => {
        if (!this._isMounted) return;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    setAlertMessageVisible(alertMessageVisible, selectedNotification) {
        this._setState({ alertMessageVisible, selectedNotification });
    }

    init = () => {

        const { _id: id, userAccessToken: accessToken, createdTime } = User.getUserData();

        const searchData = {
            id,
            accessToken,
            createdTime
        };

        Socket.request(getAllNotifications.emit, searchData);
        UserApi.getSocketResponseOnce(getAllNotifications.on, (res) => {
            if (res && res.message === "Success") {
                this._setState({ isLoading: false, notifications: res.data });
            } else this._setState({ isLoading: false, notifications: [] });
        });
    }

    /** Render item */
    renderItem = ({ item, index }) => {
        const { container, iconStyle, iconContainer } = styles;
        const { screenWidth } = this.props;

        return (
            <WTouchable dial={5} style={{ width: screenWidth, height: 80 }} onPress={this.setAlertMessageVisible.bind(this, true, item)}>
                <WRow dial={5} margin={[0, 5, 5, 5]} padding={[5, 0]} style={container}>
                    <WView dial={5} style={iconContainer} backgroundColor={Palette.theme_color}>
                        <Image source={require('../../../images/speaker.png')} style={iconStyle} />
                    </WView>
                    <WView dial={4} flex>
                        <WText fontSize={14} color={Palette.black} fontFamily={'Muli-Bold'}>{item && item.title ? item.title : ""}</WText>
                        <WText fontSize={14} color={Palette.border_color}>{item && item.description ? item.description : ''}</WText>
                        <WText fontFamily={'Muli-Bold'} color={Palette.black} >{moment(item.createdTime).fromNow()}</WText>
                    </WView>
                </WRow>
            </WTouchable>
        );
    }

    render() {
        const { notifications, isLoading, alertMessageVisible, selectedNotification } = this.state;
        const { screenWidth } = this.props;

        if (!isLoading && notifications && !notifications.length)
            return (
                <WView dial={5} flex>
                    <Image
                        source={require("../../../images/noNotifications.png")}
                        style={{ width: 100, height: 100 }}
                    />
                </WView>
            );

        return (
            <FlatList
                keyExtractor={(item, index) => `notifications-${index}`}
                ListHeaderComponent={
                    isLoading ?
                        <WView dial={5}>
                            <WSpinner size={"small"} color={Palette.theme_color} />
                        </WView> : null

                }
                ListFooterComponent={
                    <EventNotificationinfo
                        {...this.props}
                        isVisible={alertMessageVisible}
                        title={selectedNotification && selectedNotification.title ? selectedNotification.title : ''}
                        description={selectedNotification && selectedNotification.description ? selectedNotification.description : ''}
                        setVisible={this.setAlertMessageVisible.bind(this, false)}
                    />
                }
                data={notifications}
                style={{ flexGrow: 1, marginBottom: 60 }}
                renderItem={this.renderItem} />
        )
    }
}

const styles = {
    container: {
        borderColor: Palette.line_color,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid'
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    iconStyle: {
        width: 30,
        height: 30,
        tintColor: Palette.white
    }
}
