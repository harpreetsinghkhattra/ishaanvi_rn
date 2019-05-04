import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image } from 'react-native';
import { WText, WView, WRow } from '../common';
import { ShopListItem } from '../ListItems/';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';
import { ProductCardsListItem } from '../Card/Search';

export default class ShopList extends Component {

    state = {
        data: []
    }

    static propTypes = {
        heading: PropTypes.string,
        data: PropTypes.object,
    }

    static defaultProps = {
        data: [{}, {}, {}]
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }

    render = () => {
        const { heading, isError, onSelect, data, onPress, openSearch } = this.props;
        const {
            shopListHeaderLine,
            subContainer,
            sendIconStyle,
        } = styles;
        const sendIcon = require("../../images/send.png");

        console.log("data ===> ", data);

        return (
            <WView dial={5} margin={[10, 5]}>
                <WText fontSize={data && data.category ? 16 : 30} fontFamily={"Muli-Bold"} center>{data && data._id ? data._id.toUpperCase() : data && data.category ? data && data.category.toUpperCase() : ""}</WText>
                <WView margin={[2, 10, 10, 10]} style={shopListHeaderLine} />

                {
                    data && data.category ?
                        null :
                        <WRow dial={5} style={[subContainer]}>
                            <WRow dial={4} flex>
                                <WText fontSize={16} padding={[0, 5, 0, 0]} fontFamily={"Muli-Bold"}>CHANDIGARH</WText>
                                <Image source={sendIcon} style={sendIconStyle} />
                            </WRow>
                            <WText padding={[0, 0, 0, 10]} fontSize={16} color={Palette.orange} fontFamily={"Muli-Bold"} onPress={openSearch.bind(this, [data._id])}>MORE</WText>
                        </WRow>
                }
                <FlatList
                    data={data && data.values ? data.values.slice(0, 6) : []}
                    style={{ alignSelf: 'stretch' }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => (`shop-item-${index}`)}
                    renderItem={({ item, index }) => {
                        if (data && data.category === "RECENT VISITED PRODUCTS") return (
                            <ProductCardsListItem
                                {...this.props}
                                item={item}
                                onItemPress={productId => this.openScreen(routerNames.view_product, { productId })}
                            />
                        );

                        return (
                            <ShopListItem
                                {...this.props}
                                data={item}
                            />
                        );
                    }}
                />
            </WView>
        )
    }
}

const styles = {
    shopListHeaderLine: {
        width: 60,
        height: 2,
        backgroundColor: Palette.orange
    },
    subContainer: {
        alignSelf: 'stretch'
    },
    sendIconStyle: {
        width: 20,
        height: 20,
        tintColor: Palette.orange
    }
}