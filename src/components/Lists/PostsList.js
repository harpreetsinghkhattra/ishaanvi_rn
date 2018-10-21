import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native';
import { WText, WView } from '../common';
import { PostListItem } from '../ListItems/';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';

export default class PostsList extends Component {

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

        return (
            <FlatList
                data={data}
                style={{ alignSelf: 'stretch' }}
                keyExtractor={(item, index) => (`item-${index}`)}
                renderItem={({ item, index }) => {
                    return (
                        <PostListItem
                            onPress={onPress.bind(this, routerNames.view_offer, item)}
                            item={item}
                        />
                    );
                }}
            />
        )
    }
}
