import React, { Component } from 'react';
import { View, Text, Image, NativeModules, Platform, Linking } from 'react-native';
import Palette from '../../Palette';
import TabsView from '../../components/Tabs/TabsView';
import TabViews from '../../components/Tabs/TabViews';
import { WTouchable, WText, WRow, WView } from '../../components/common/';
import { SearchHeader } from '../../components/Header';
import { routerNames } from '../../RouteConfig';

import Index from './Index';
import UserProfile from './UserProfile';
import Search from '../Search/Search';
import Chat from '../Chat/index';
import EventEmitter from 'events';

import { Api, Socket, User as UserApi } from '../../api';
import { User } from '../../model/user';
import { get_user_profile } from '../../api/SocketUrls';
import { Storage, StorageKeys, Helper } from '../../helper';
const UserData = new Storage();

import { Hacks } from '../../scenes/Modal/'

export default class Home extends Component {

    constructor(props) {
        super(props);

        this._tabEmitter = new EventEmitter();
        Linking.getInitialURL().then(NativeModules.AndroidCommon.getSharedLinkInApp(this._handleDeepLinkingUrl.bind(this))).catch(err => console.log('url ===> error ', err));
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }

    _handleDeepLinkingUrl = (data) => {
        const url = data && data.url ? data.url : data;

        console.log("url ===> home", url);
        if (url) {

            this.closeSplashScreen();
            if (url.indexOf('product') > -1) {
                var param = url.split('/share/')[1].replace('product/', '');
                if (param.length !== 24) return;
                this.openScreen(routerNames.view_product, { productId: param })
            }

            if (url.indexOf('shop') > -1) {
                var param = url.split('/share/')[1].replace('shop/', '');
                if (param.length !== 24) return;
                this.openScreen(routerNames.viewPortal, { userId: param })
            }
        }
    }

    _handleProductNotifications = () => {
        const { productNotificationData, resetProductNotificationData } = this.props;

        if (!productNotificationData) return;

        resetProductNotificationData && resetProductNotificationData();
        this.openScreen(routerNames.view_product, { productId: productNotificationData.productId });
    }

    state = {
        isLoading: false,
        alertMessageVisible: false
    }

    componentDidMount = () => {
        Socket.request("/socket/api/saveUser", {
            id: User.getUserData()._id
        });
        this.getUserResponse();

        this.closeSplashScreen();

        this._handleProductNotifications();
    }

    getUserResponse() {
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        Socket.request(get_user_profile.emit, { id, accessToken });
        UserApi.getSocketResponseOnce(get_user_profile.on, (res) => {
            if (res && res.message && res.message.toLowerCase() === "blocked") {
                this.onLogout();
            }
        });
    }

    async onLogout() {
        const { history } = this.props;

        User.resetUserData();
        await UserData.removeItem(StorageKeys.USER_DATA);
        Helper.resetAndPushRoot(history, routerNames.selectUserAction);
    }

    getIntialIndex = () => {
        const { history } = this.props;
        const { location } = history;
        const state = location && location.state ? location.state : {};
        if (state.selectedIndex) return state.selectedIndex;

        return 0;
    }

    closeSplashScreen() {
        if (Platform.OS === "android") {
            NativeModules.AndroidCommon.closeSplashScreen();
        }
    }

    // shouldComponentUpdate = (nextProps, nextState) => {
    //     const { history } = this.props;
    //     const { location } = history;
    //     const state = location && location.state ? location.state : {};
    //     if (state.selectedIndex) return false;

    //     return true;
    // } 

    componentWillUnmount() {
        this._tabEmitter.removeAllListeners();
    }

    setAlertMessageVisible(alertMessageVisible) {
        this.setState({ alertMessageVisible });
    }

    openSearch = (category) => {
        this.tabsViewRef.setPage(1);
        this.searchRef.searchViaCategory(category);
    }

    render() {
        console.log("home loading render in tabs");
        const empty = [];
        const views = [
            <Index
                tabEmitter={this._tabEmitter}
                openSearch={this.openSearch.bind(this)}
                initialPage={this.getIntialIndex()}
                {...this.props} />,
            <Search
                tabEmitter={this._tabEmitter}
                ref={ref => this.searchRef = ref}
                initialPage={this.getIntialIndex()}
                {...this.props} />,
            empty,
            <Chat
                tabEmitter={this._tabEmitter}
                initialPage={this.getIntialIndex()}
                {...this.props} />,
            <UserProfile
                tabEmitter={this._tabEmitter}
                initialPage={this.getIntialIndex()}
                {...this.props} />
        ];

        const { screenWidth, screenHeight, history } = this.props;
        const { alertMessageVisible } = this.state;

        const _renderHeader = () => {
            let tabs = [
                {
                    text: '',
                    iconSource: require('../../images/home.png'),
                },
                {
                    text: '',
                    iconSource: require('../../images/search.png'),
                },
                {
                    text: '',
                    onTabPress: this.setAlertMessageVisible.bind(this, true),
                    iconSource: require('../../images/trending.png'),
                },
                {
                    text: '',
                    iconSource: require('../../images/inbox.png'),
                },
                {
                    text: '',
                    iconSource: require('../../images/user.png'),
                }
            ];
            return (
                <TabsView
                    tabs={tabs}
                    tabEmitter={this._tabEmitter}
                    iconStyle={{ tintColor: Palette.white }}
                />
            );
        }

        return (
            <WView dial={2} flex={1} style={[{ width: screenWidth, minHeight: screenHeight }]}>
                <WView dial={2} flex style={{ alignSelf: 'stretch', alignItems: 'stretch' }}>
                    <Hacks
                        {...this.props}
                        isVisible={alertMessageVisible}
                        setVisible={this.setAlertMessageVisible.bind(this, false)} />
                    <TabViews
                        tabPosition="bottom"
                        indicator={_renderHeader()}
                        initialPage={this.getIntialIndex()}
                        tabEmitter={this._tabEmitter}
                        ref={ref => this.tabsViewRef = ref}
                        style={{ flex: 1 }}
                    >
                        {views.map((ele, index) =>
                            <WView key={`home-tab-${index}`}>
                                {ele}
                            </WView>
                        )}
                    </TabViews>
                </WView>
            </WView>
        )
    }
}
