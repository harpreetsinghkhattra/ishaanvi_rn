import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import Palette from '../../Palette';
import { TabsView } from '../../components/Card/Search';
import TabViews from '../../components/Tabs/TabViews';
import { WTouchable, WText, WRow, WView } from '../../components/common/';
import { SearchHeader } from '../../components/Header';
import { routerNames } from '../../RouteConfig';

import Chat from '../Chat/Chat';
import Notifications from '../Chat/Notifications';
import { ProductList, ShopList } from '../../components/Card/Search'
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

    componentDidMount() {
        const { isFilter } = this.props;

        if (this.getIntialPage() === 0) isFilter && isFilter(false);
    }

    componentWillUnmount() {
        this._tabEmitter.removeAllListeners();
    }

    getIntialPage = () => {
        const { location } = this.props;

        return location && location.state && location.state.selectedSearchPageIndex ? parseInt(location.state.selectedSearchPageIndex) : 0;
    }

    render() {
        const { location, data } = this.props;
        const { tabEmitter, setSearchTabIndex, ...rest } = this.props;

        setSearchTabIndex(this.getIntialPage());

        const views = [
            <ProductList
                {...rest}
                isSearch
                data={data && data.length && data[0].product && data[0].product.length ? data[0].product : []}
                isEmpty={data && data.length ? data[0].product && data[0].product.length ? false : true : false}
                initialSearchTabPage={this.getIntialPage()}
                tabEmitter={this._tabEmitter}
            />,
            <ShopList
                {...rest}
                isEmpty={data && data.length ? data[0].users && data[0].users.length ? false : true : false}
                initialSearchTabPage={this.getIntialPage()}
                tabEmitter={this._tabEmitter}
            />
        ];
        const { screenWidth, screenHeight, history } = this.props;

        const _renderHeader = () => {
            let tabs = [
                {
                    label: 'By Products',
                },
                {
                    label: 'By Shops',
                }
            ];
            return (
                <TabsView
                    tabEmitter={this._tabEmitter}
                    setSearchTabIndex={setSearchTabIndex}
                    tabs={tabs}
                />
            );
        }

        return (
            <WView dial={2} flex={1} style={[{ width: screenWidth, minHeight: screenHeight - 100 }]}>
                <WText color={Palette.orange} fontFamily={"Muli-Bold"} fontSize={18}>EXPLORE THE DESIGNER FASION</WText>
                <WText color={Palette.orange} fontFamily={"Muli-Bold"} fontSize={22}>#Locally#</WText>
                <WView dial={2} flex style={{ alignSelf: 'stretch', alignItems: 'stretch' }}>
                    <TabViews
                        tabPosition="top"
                        indicator={_renderHeader()}
                        initialPage={this.getIntialPage()}
                        horizontalScroll={true}
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
