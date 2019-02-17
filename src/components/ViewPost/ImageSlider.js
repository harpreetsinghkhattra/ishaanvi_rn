import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Palette from '../../Palette';
import { SliderIndicator } from './';
import TabViews from '../Tabs/TabViews';
import { WTouchable, WText, WRow, WView } from '../common/';
import { routerNames } from '../../RouteConfig';

export default class Home extends Component {

    static propTypes = {
        data: PropTypes.array,
        minHeight: PropTypes.number,
        autoPlayEnable: PropTypes.bool,
        imagePress: PropTypes.bool
    }

    static defaultProps = {
        minHeight: 200,
        imagePress: true
    }

    openPress(path, data) {
        const { history, imagePress } = this.props;
        if(!imagePress) return;

        history.push(path, data);
    }

    render() {
        const { data, minHeight } = this.props;
        const empty = [];
        const { screenWidth, screenHeight, history, autoPlayEnable } = this.props;

        const _renderHeader = () => {
            return (
                <SliderIndicator
                    tabs={data}
                    iconStyle={{ tintColor: Palette.white }}
                />
            );
        }

        return (
            <WView dial={2} flex={1} style={[{ width: screenWidth, minHeight: minHeight }]}>
                <WView dial={2} flex style={{ alignSelf: 'stretch', alignItems: 'stretch' }}>
                    <TabViews
                        tabPosition="bottom"
                        horizontalScroll={true}
                        indicator={_renderHeader()}
                        autoPlayEnable={autoPlayEnable}
                        style={{ flex: 1 }}
                    >
                        {data.map((ele, index) =>
                            <WTouchable onPress={this.openPress.bind(this, routerNames.view_offer_images, { data, initialPage: index })} activeOpacity={1} flex key={`images-${index}`}>
                                <Image source={{ uri: ele }} style={{ width: screenWidth, height: 200 }} resizeMode={"cover"} />
                            </WTouchable>
                        )}
                    </TabViews>
                </WView>
            </WView>
        )
    }
}
