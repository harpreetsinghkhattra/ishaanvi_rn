import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Palette from '../../Palette';
import { SliderIndicator } from './';
import TabViews from '../Tabs/TabViews';
import { WTouchable, WText, WRow, WView, Image } from '../common/';
import { routerNames } from '../../RouteConfig';

export default class ImageSlider extends Component {

    static propTypes = {
        data: PropTypes.array,
        minHeight: PropTypes.number,
        autoPlayEnable: PropTypes.bool,
        imagePress: PropTypes.bool,
        absolutePath: PropTypes.bool
    }

    static defaultProps = {
        minHeight: 200,
        imagePress: true,
        absolutePath: false
    }

    openPress(path, data) {
        const { history, imagePress } = this.props;
        if (!imagePress) return;

        history.push(path, data);
    }

    render() {
        const { data, minHeight } = this.props;
        const empty = [];
        const { screenWidth, screenHeight, history, autoPlayEnable, absolutePath } = this.props;

        const _renderHeader = () => {
            return (
                <SliderIndicator
                    {...this.props}
                    tabs={data}
                    iconStyle={{ tintColor: Palette.white }}
                />
            );
        }

        return (
            <TabViews
                tabPosition="bottom"
                horizontalScroll={true}
                indicator={_renderHeader()}
                autoPlayEnable={autoPlayEnable}
                style={{ minWidth: screenWidth, minHeight: minHeight }}
            >
                {data.map((ele, index) =>
                    <WTouchable  onPress={this.openPress.bind(this, routerNames.view_offer_images, { data, initialPage: index })} activeOpacity={1} key={`images-${index}`}>
                        <Image source={absolutePath ? ele : { uri: ele }} width={screenWidth}/>
                    </WTouchable>
                )}
            </TabViews>
        )
    }
}
