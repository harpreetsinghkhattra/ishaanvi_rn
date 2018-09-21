import React from 'react'
import PropTypes from 'prop-types'
import { WView } from './'
import Palette from '../../Palette';

export default TabBase = ({ color, style }) => {
    const { tabStyle } = styles;

    return (<WView style={[style, tabStyle, { backgroundColor: color }]} />);
}

TabBase.propTypes = {
    color: PropTypes.string
}
 
TabBase.defaultProps = {
    color: Palette.tabBaseColor_1
}

const styles = {
    tabStyle: {
        alignSelf: 'stretch',
        height: 4,
        borderRadius: 2
    }
}