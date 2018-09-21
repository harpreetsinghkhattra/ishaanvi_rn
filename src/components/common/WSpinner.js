import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'react-native';

export default WSpinner = ({ size, color }) => {
    return (
        <ActivityIndicator
            size={size}
            color={color}
        />
    )
}

WSpinner.propTypes = {
    size: PropTypes.string
}

WSpinner.defaultProps = {
    size: 'small'
}
