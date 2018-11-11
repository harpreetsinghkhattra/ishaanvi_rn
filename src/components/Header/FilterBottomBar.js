import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WTouchable, WView, WText } from '../common'
import Palette from '../../Palette'

export default class FilterBottomBar extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        onApply: PropTypes.func
    }

    render() {
        const { onClose, onApply } = this.props;
        const { container, leftBtnStyle } = styles;

        return (
            <WRow dial={5} backgroundColor={Palette.white} style={container}>
                <WTouchable flex dial={5} onPress={onClose} style={leftBtnStyle}>
                    <WText letterSpacing={2} fontSize={14} right fontFamily={"Muli-Bold"} >CLOSE</WText>
                </WTouchable>
                <WTouchable flex dial={5} onPress={onApply}>
                    <WText letterSpacing={2} fontSize={14} right fontFamily={"Muli-Bold"} color={Palette.theme_color}>APPLY</WText>
                </WTouchable>
            </WRow>
        )
    }
}

const styles = {
    container: {
        height: 56,
        borderTopWidth: 1,
        borderColor: Palette.line_color,
        borderStyle: 'solid'
    },
    leftBtnStyle:{
        borderRightWidth: 1,
        borderColor: Palette.line_color,
        borderStyle: 'solid',
        paddingVertical: 5
    }
};