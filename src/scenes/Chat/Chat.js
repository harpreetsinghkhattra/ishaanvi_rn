import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ChatList from '../../components/Card/Chat/ChatList'

export default class Chat extends PureComponent {
    static propTypes = {

    }

    render() {
        return (
            <ChatList
                {...this.props} />
        )
    }
}
