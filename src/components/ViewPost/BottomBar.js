import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WView, WRow, WTouchable, WText } from '../common'
import Palette from '../../Palette';

export default class BottomBar extends PureComponent {
    static propTypes = {
        item: PropTypes.shape({
            leftBtnLabel: PropTypes.string,
            rightBtnLabel: PropTypes.string,
            leftBtnPress: PropTypes.func,
            rightBtnPress: PropTypes.func
        })
    }

    render() {
        const { leftBtnLabel, rightBtnLabel, leftBtnPress, rightBtnPress } = this.props;
        const { leftBtnStyle, rightBtnStyle, container } = styles;

        return (
            <WRow dial={5} style={container}>
                <WTouchable dial={5} style={leftBtnStyle}>
                    <WText fontSize={18} fontFamily={"Muli-Bold"} color={Palette.white}>{leftBtnLabel}</WText>
                </WTouchable>
                <WTouchable dial={5} style={rightBtnStyle}>
                    <WText fontSize={18} fontFamily={"Muli-Bold"} color={Palette.text_color}>{rightBtnLabel}</WText>
                </WTouchable>
            </WRow>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        borderColor: Palette.border_color,
        borderTopWidth: 1,
        borderStyle: 'solid',
        backgroundColor: Palette.white,
        alignItems: 'stretch'
    },
    leftBtnStyle: {
        flex: 1,
        backgroundColor: Palette.theme_color
    },
    rightBtnStyle: {
        flex: 1,
        backgroundColor: Palette.white
    }
}