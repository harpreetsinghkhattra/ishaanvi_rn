import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Palette from '../../Palette';
import TabsView from '../../components/Tabs/TabsView';
import TabViews from '../../components/Tabs/TabViews';
import { WTouchable, WText, WRow, WView } from '../../components/common/';
import { SearchHeader } from '../../components/Header';

import Index from './Index';

export default class Home extends Component {
    render() {

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
                    iconStyle={{ tintColor: Palette.white }}
                />
            );
        }

        return (
            <WView dial={2} flex={1}>
                <WView dial={2} flex style={{ alignSelf: 'stretch', alignItems: 'stretch' }}>
                    <SearchHeader />
                    <TabViews
                        tabPosition="bottom"
                        indicator={_renderHeader()}
                        style={{ flex: 1 }}
                    >
                        <WView>
                            <Index
                                {...this.props} />
                        </WView>
                        <WView>
                            <Index
                                {...this.props} />
                        </WView>
                        <WView>
                            <Index
                                {...this.props} />
                        </WView>
                        <WView>
                            <Index
                                {...this.props} />
                        </WView>
                        <WView>
                            <Index
                                {...this.props} />
                        </WView>
                    </TabViews>
                </WView>
            </WView>
        )
    }
}
