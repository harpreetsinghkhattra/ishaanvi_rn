import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Palette from '../../Palette';
import TabsView from '../../components/Tabs/TabsView';
import TabViews from '../../components/Tabs/TabViews';
import { WTouchable, WText, WRow, WView } from '../../components/common/';
import { SearchHeader } from '../../components/Header';
import { routerNames } from '../../RouteConfig';

import Index from './Index';
import UserProfile from './UserProfile';

export default class Home extends Component {

    componentDidMount() {
        
    }

    render() {
        const empty = [];
        const views = [
            <Index
                {...this.props} />,
            empty,
            empty,
            empty,
            <UserProfile
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
                    onTabPress: () => alert("Comming soon..."),
                    iconSource: require('../../images/search.png'),
                },
                {
                    text: '',
                    onTabPress: () => alert("Comming soon..."),
                    iconSource: require('../../images/trending.png'),
                },
                {
                    text: '',
                    onTabPress: () => alert("Comming soon..."),
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
                    iconStyle={{ tintColor: Palette.white }}
                />
            );
        }

        return (
            <WView dial={2} flex={1} style={[{width: screenWidth, minHeight: screenHeight}]}>
                <WView dial={2} flex style={{ alignSelf: 'stretch', alignItems: 'stretch' }}>
                    <TabViews
                        tabPosition="bottom"
                        indicator={_renderHeader()}
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
