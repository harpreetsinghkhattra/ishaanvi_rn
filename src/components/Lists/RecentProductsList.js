import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native';
import { WText, WView, WRow } from '../common';
import { RecentProductsItem } from '../ListItems/';
import Palette from '../../Palette';

export default class RecentProductsList extends Component {

    static propTypes = {
        heading: PropTypes.string
    }

    render = () => {
        const { heading } = this.props;

        return (
            <WView dial={4} >
                <WRow dial={4} style={[{ justifyContent: 'space-between', alignSelf: 'stretch' }]}>
                    <WView flex={0.7}>
                        <WText fontSize={14} left fontFamily="Muli-Bold">{heading}</WText>
                    </WView>
                    <WView flex={0.3}>
                        <WText fontSize={14} right fontFamily="Muli-Bold" color={Palette.theme_color}>{"view more"}</WText>
                    </WView>
                </WRow>
                <FlatList
                    horizontal={true}
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={(item, index) => (`item-${index}`)}
                    renderItem={() => (
                        <RecentProductsItem spaced />
                    )}
                />
            </WView>
        )
    }
}
