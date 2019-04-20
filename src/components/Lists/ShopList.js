import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image } from 'react-native';
import { WText, WView, WRow } from '../common';
import { ShopListItem } from '../ListItems/';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';

export default class ShopList extends Component {

    state = {
        data: []
    }

    static propTypes = {
        heading: PropTypes.string,
        data: PropTypes.array,
    }

    static defaultProps = {
        data: [{}, {}, {}]
    }

    render = () => {
        const { heading, isError, onSelect, data, onPress } = this.props;
        const {
            shopListHeaderLine,
            subContainer,
            sendIconStyle,
        } = styles;
        const sendIcon = require("../../images/send.png");

        return (
            <WView dial={5} margin={[10, 5]}>
                <WText fontSize={30} fontFamily={"Muli-Bold"} center>{data.name}</WText>
                <WView margin={[2, 10, 10, 10]} style={shopListHeaderLine} />

                <WRow dial={5} style={[subContainer]}>
                    <WRow dial={4} flex>
                        <WText fontSize={16} padding={[0, 5, 0, 0]} fontFamily={"Muli-Bold"}>CHANDIGARH</WText>
                        <Image source={sendIcon} style={sendIconStyle} />
                    </WRow>
                    <WText padding={[0, 0, 0, 10]} fontSize={16} color={Palette.orange} fontFamily={"Muli-Bold"}>MORE</WText>
                </WRow>
                <FlatList
                    data={[{}, {}, {}]}
                    style={{ alignSelf: 'stretch' }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => (`shop-item-${index}`)}
                    renderItem={({ item, index }) => {
                        return (
                            <ShopListItem
                                item={item}
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