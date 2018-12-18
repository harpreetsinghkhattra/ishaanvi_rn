import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import Palette from '../../Palette';
import { TabsView } from '../../components/Card/Chat';
import TabViews from '../../components/Tabs/TabViews';
import { WTouchable, WText, WRow, WView } from '../../components/common/';
import { SearchHeader } from '../../components/Header';
import { routerNames } from '../../RouteConfig';

import Chat from './Chat';
import Notifications from './Notifications';
import EventEmitter from 'events';

import { Api, Socket, User as UserApi } from '../../api';
import { User } from '../../model/user';
import { get_user_profile } from '../../api/SocketUrls';
import { Storage, StorageKeys, Helper } from '../../helper';
const UserData = new Storage();

const PAGE_INDEX = 0;

export default class Home extends PureComponent {

    constructor(props) {
        super(props);

        const { initialPage } = this.props;
        this.state = {
            isLazyLoading: initialPage === PAGE_INDEX ? true : false
        }

        this.listenLazyLoadEvent();
    }

    listenLazyLoadEvent = () => {
        const { tabEmitter } = this.props;
        if (tabEmitter.addListener) {
            tabEmitter.addListener('home_lazy_load', (data) => {
                if (data && data.index === 0)
                    this.setState(prevState => {
                        if (!prevState.isLazyLoading) {
                            // this.init()
                            return { isLazyLoading: true };
                        }
                    });
            });
        }
    }

    render() {
        const empty = [];
        
        const { isLazyLoading } = this.state;
        if (!isLazyLoading) return empty;

        const views = [
            <Notifications
                {...this.props} />, 
            <Chat
                {...this.props} />
        ];
        const { screenWidth, screenHeight, history } = this.props;
 
        const _renderHeader = () => {
            let tabs = [
                {
                    label: 'Notifications',
                },
                {
                    label: 'Chat',
                }
            ];
            return (
                <TabsView
                    tabs={tabs}
                />
            );
        }

        return (
            <WView dial={2} flex={1} style={[{ width: screenWidth, minHeight: screenHeight }]}>
                <WView dial={2} flex style={{ alignSelf: 'stretch', alignItems: 'stretch' }}>
                    <TabViews
                        tabPosition="top"
                        indicator={_renderHeader()}
                        initialPage={0}
                        horizontalScroll={true}
                        changePageWithAnimation={true}
                        style={{ flex: 1 }}
                    >
                        {views.map((ele, index) =>
                            <WView key={`inbox-tab-${index}`}>
                                {ele}
                            </WView>
                        )}
                    </TabViews>
                </WView>
            </WView>
        )
    }
}
