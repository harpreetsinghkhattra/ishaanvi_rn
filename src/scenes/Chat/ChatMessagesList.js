import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image } from 'react-native'
import { WView, WRow } from '../../components/common'

export default class ChatMessagesList extends PureComponent {

    static propTypes = {

    }

    message = () => {

    }

    renderItem = () => {
        return (
            <WView>
                
            </WView>
        );
    }

    render() {
        return (
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={this.renderItem.bind(this)} />
        )
    }
}
