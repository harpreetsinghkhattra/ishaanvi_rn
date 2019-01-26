import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import NotficationsList from '../../components/Card/Chat/NotificationsList'

export default class Notifications extends PureComponent {

    static propTypes = {

    }

    render() {
        return (
            <NotficationsList 
                {...this.props}
                />
        )
    }
}
