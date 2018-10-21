import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Palette from '../../Palette';
import { SliderIndicator } from './';
import TabViews from '../Tabs/TabViews';
import { WTouchable, WText, WRow, WView } from '../common/';
import { routerNames } from '../../RouteConfig';

export default class Home extends Component {

    render() {
        const { screenWidth, screenHeight, history, location } = this.props;
        const { data, initialPage } = location.state;
        const empty = [];
        const views = [
            { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4idCXJDfaeZP6TVEynolhQN4cXZw0Mh9QFyQTIGEBEum5Xsz_' },
            { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4idCXJDfaeZP6TVEynolhQN4cXZw0Mh9QFyQTIGEBEum5Xsz_' },
            { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4idCXJDfaeZP6TVEynolhQN4cXZw0Mh9QFyQTIGEBEum5Xsz_' },
            { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4idCXJDfaeZP6TVEynolhQN4cXZw0Mh9QFyQTIGEBEum5Xsz_' },
            { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4idCXJDfaeZP6TVEynolhQN4cXZw0Mh9QFyQTIGEBEum5Xsz_' },
        ];

        const _renderHeader = () => {
            return (
                <SliderIndicator
                    tabs={data}
                    iconStyle={{ tintColor: Palette.white }}
                />
            );
        }

        return (
            <WView dial={2} flex={1} style={[{ width: screenWidth, minHeight: screenHeight }]}>
                <WView dial={2} flex style={{ alignSelf: 'stretch', alignItems: 'stretch' }}>
                    <TabViews
                        tabPosition="bottom"
                        horizontalScroll={true}
                        indicator={_renderHeader()}
                        initialPage={initialPage ? initialPage : 0}
                        style={{ flex: 1 }}
                    >
                        {data.map((ele, index) =>
                            <WView flex key={`images-${index}`}>
                                <Image source={{ uri: ele }} style={{ width: screenWidth, height: screenHeight }} resizeMode={"cover"} />
                            </WView>
                        )}
                    </TabViews>
                </WView>
            </WView>
        )
    }
}
