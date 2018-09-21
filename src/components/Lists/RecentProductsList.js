import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native';
import { WText, WView } from '../common';
import { RecentProductsItem } from '../ListItems/';

export default class RecentProductsList extends Component {

    static propTypes = {
        heading: PropTypes.string
    }

    render = () => {
        const { heading } = this.props;

        return (
            <WView dial={4} >
                <WText fontSize={14} right fontFamily="Muli-Bold">{heading}</WText>
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
