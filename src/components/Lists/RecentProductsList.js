import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native';
import { WText, WView, WRow, WSpinner, WTouchable } from '../common';
import { RecentProductsItem } from '../ListItems/';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';

export default class RecentProductsList extends PureComponent {

    static propTypes = {
        heading: PropTypes.string,
        data: PropTypes.array,
        isLoading: PropTypes.bool,
        isViewMore: PropTypes.bool
    }

    static defaultProps = {
        isViewMore: true
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }

    render = () => {
        const { heading, data, isLoading, isViewMore, onPress, userId } = this.props;

        return (
            <WView dial={4} >
                <WRow dial={4} style={[{ justifyContent: 'space-between', alignSelf: 'stretch' }]}>
                    <WView flex={0.7}>
                        <WText fontSize={14} left fontFamily="Muli-Bold">{heading}</WText>
                    </WView>
                    {
                        isViewMore ?
                            <WTouchable flex={0.3} onPress={this.openScreen.bind(this, routerNames.viewPortal, { screenType: "home", userId: userId })}>
                                <WText fontSize={14} right fontFamily="Muli-Bold" color={Palette.theme_color}>{"view more"}</WText>
                            </WTouchable> : null
                    }
                </WRow>
                <FlatList
                    horizontal={true}
                    data={data}
                    keyExtractor={(item, index) => (`item-${index}`)}
                    renderItem={({ item, index }) => (
                        <RecentProductsItem  {...this.props} onPress={this.openScreen.bind(this, routerNames.view_product, { screenType: "home", productId: item._id })} key={`rencet-product-item-${index}`} data={item} spaced />
                    )}
                />
                {
                    isLoading ?
                        <WView dial={5} style={{ justifyContent: 'center', alignSelf: 'stretch' }} padding={[5, 5]}>
                            <WSpinner size={"small"} color={Palette.theme_color} />
                        </WView>
                        : null
                }
            </WView>
        )
    }
}
