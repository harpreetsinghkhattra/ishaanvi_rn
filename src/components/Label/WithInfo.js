import React from 'react'
import PropTypes from 'prop-types'
import { WText, WRow, WView } from '../common';
import Palette from '../../Palette';

const WithInfo = ({ label, value, padding }) => {
    const { lineView, stretch } = styles;

    return (
        <WView dial={5} padding={padding} style={[stretch]}>
            <WText fontSize={14} fontFamily={"Muli-Bold"}>{label} :</WText>
            <WText fontSize={14} lines={2} color={Palette.border_color}>{value}</WText>
        </WView>
    )
}

WithInfo.propTypes = {
    label: PropTypes.string,
    padding: PropTypes.array
}

WithInfo.defaultProps = {
    padding: [10, 0]
}

const styles = {
    stretch: {
        alignItems: "stretch"
    },
    lineView: {
        backgroundColor: Palette.theme_color,
        height: 2
    }
}

export default WithInfo

