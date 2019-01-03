import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
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

export default class Home extends PureComponent {

    constructor(props) {
        super(props);

        this._tabEmitter = new EventEmitter();
    }

    getIntialIndex = () => {
        const { history } = this.props;
        const { location } = history;
        const state = location && location.state ? location.state : {};
        if (state.selectedIndex) return state.selectedIndex;

        return 0;
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

    render() {
        console.log("home loading render in tabs");
        const empty = [];
        const views = [
            <Index
                tabEmitter={this._tabEmitter}
                initialPage={this.getIntialIndex()}
                {...this.props} />,
            <Search
                tabEmitter={this._tabEmitter}
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
                    onTabPress: () => alert("Comming soon..."),
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
                    <TabViews
                        tabPosition="bottom"
                        indicator={_renderHeader()}
                        initialPage={this.getIntialIndex()}
                        tabEmitter={this._tabEmitter}
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
