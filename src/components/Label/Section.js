import React from 'react'
import PropTypes from 'prop-types'
import { WText, WRow, WView } from '../common';
import Palette from '../../Palette';

const SectionLabel = ({ label }) => {
    const { lineView, stretch, container } = styles;

    return (
        <WRow dial={5} style={[container]}>
            <WView style style={[lineView, { width: 30 }]} />
            <WText padding={[10, 10]} fontSize={14} fontFamily={"Muli-Bold"} center>{label}</WText>
            <WView style={[lineView]} flex />
        </WRow>
    )
}

SectionLabel.propTypes = {
    label: PropTypes.string
}

const styles = {
    container: {
        height: 40,
    },
    stretch: {
        alignItems: "stretch"
    },
    lineView: {
        backgroundColor: Palette.theme_color,
        height: 2
    }
}

export default SectionLabel

