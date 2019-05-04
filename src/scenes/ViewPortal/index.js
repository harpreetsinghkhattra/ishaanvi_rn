import React, { PureComponent, Component } from 'react';
import { View, Text, Image } from 'react-native';
import Palette from '../../Palette';
import { TabsView } from '../../components/Card/Chat';
import TabViews from '../../components/Tabs/TabViews';
import { WTouchable, WText, WRow, WView } from '../../components/common/';
import { SearchHeader } from '../../components/Header';
import { routerNames } from '../../RouteConfig';

import { ProductList } from '../../components/Card/Search';
import { userPortalProducts } from '../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../api';
import { User } from '../../model/user';
import { get_user_profile } from '../../api/SocketUrls';

export default class ViewPortal extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            newProducts: [],
            popularProducts: [],
            saleProducts: [],
            isLoading: true
        }
        this._isMounted = true;
    }

    _setState = (value, cb) => {
        if (!this._isMounted) return;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount = () => {
        this.getUserProductsViaType();
    }


    getUserProductsViaType = () => {
        const { _id: id, userAccessToken: accessToken, filterData } = User.getUserData();

        const { location } = this.props;
        const { state } = location;

        Socket.request(userPortalProducts.emit, {
            id,
            accessToken,
            userId: state.userId
        });

        this.getResponse();
    }

    getResponse = (cb) => {
        const { type, location } = this.props;
        const { state } = location;

        UserApi.getSocketResponse(userPortalProducts.on, (res) => {
            if (res && res.message === "Success") {
                this._setState({
                    saleProducts: res.data[0].saleProducts,
                    newProducts: res.data[0].newProducts,
                    popularProducts: res.data[0].popularProducts,
                    isLoading: false
                });
            } else this._setState({ isLoading: false });
        });
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }

    render() {
        const empty = [];
        // const data = [
        //     { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
        //     { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
        //     { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
        //     { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
        //     { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
        //     { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
        //     { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
        //     { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
        // ];

        const { saleProducts, newProducts, popularProducts, isLoading } = this.state;

        const views = [
            <ProductList
                {...this.props}
                isMore
                isLoading={isLoading}
                isLazyLoading={false}
                data={saleProducts}
                type={"sale"}
            />,
            <ProductList
                {...this.props}
                isMore
                isLoading={isLoading}
                isLazyLoading={false}
                data={newProducts}
                type={"new"} />,
            <ProductList
                {...this.props}
                isMore
                data={popularProducts}
                isLazyLoading={false}
                isLoading={isLoading}
                type={"popular"} />
        ];
        const { screenWidth, screenHeight, history } = this.props;

        const _renderHeader = () => {
            let tabs = [
                {
                    label: 'SALE',
                },
                {
                    label: 'NEW',
                },
                {
                    label: 'POPULAR',
                }
            ];
            return (
                <TabsView
                    tabs={tabs}
                />
            );
        }

        return (
            <WView dial={2} flex={1} style={[{ width: screenWidth }]}>
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
