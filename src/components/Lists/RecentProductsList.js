import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native';
import { WText, WView, WRow, WSpinner } from '../common';
import { RecentProductsItem } from '../ListItems/';
import Palette from '../../Palette';

export default class RecentProductsList extends Component {

    static propTypes = {
        heading: PropTypes.string,
        data: PropTypes.array,
        isLoading: PropTypes.bool
    }

    render = () => {
        const { heading, data, isLoading } = this.props;

        return (
            <WView dial={4} >
                <WRow dial={4} style={[{ justifyContent: 'space-between', alignSelf: 'stretch' }]}>
                    <WView flex={0.7}>
                        <WText fontSize={14} left fontFamily="Muli-Bold">{heading}</WText>
                    </WView>
                    <WView flex={0.3}>
                        <WText fontSize={14} right fontFamily="Muli-Bold" color={Palette.theme_color} onPress={() => { alert("comming soon...") }}>{"view more"}</WText>
                    </WView>
                </WRow>
                <FlatList
                    horizontal={true}
                    data={data}
                    keyExtractor={(item, index) => (`item-${index}`)}
                    renderItem={({ item, index }) => (
                        <RecentProductsItem key={`rencet-product-item-${index}`} data={item} spaced />
                    )}
                />
                {
                    isLoading ?
                        <WView dial={5} style={{ justifyContent: 'center', alignSelf: 'stretch'}} padding={[5, 5]}>
                            <WSpinner size={"small"} color={Palette.theme_color} />
                        </WView>
                        : null
                }
            </WView>
        )
    }
}
