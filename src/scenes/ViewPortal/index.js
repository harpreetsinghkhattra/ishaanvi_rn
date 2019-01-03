import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import Palette from '../../Palette';
import { TabsView } from '../../components/Card/Chat';
import TabViews from '../../components/Tabs/TabViews';
import { WTouchable, WText, WRow, WView } from '../../components/common/';
import { SearchHeader } from '../../components/Header';
import { routerNames } from '../../RouteConfig';

import { ProductList } from '../../components/Card/Search';

import { Api, Socket, User as UserApi } from '../../api';
import { User } from '../../model/user';
import { get_user_profile } from '../../api/SocketUrls';

export default class ViewPortal extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {
        const empty = [];
        const data = [
            { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
            { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
            { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
            { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
            { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
            { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
            { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
            { price: 100, discount: 5, images: ['https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'] },
        ];

        const views = [
            <ProductList
                {...this.props}
                data={data} />,
            <ProductList
                {...this.props}
                data={data} />,
            <ProductList
                {...this.props}
                data={data} />
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
