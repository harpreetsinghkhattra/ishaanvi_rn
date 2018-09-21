import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'native-base';
import { WText, WTouchable, WRow, WView, WButton } from '../common/';
import { Image, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import Palette from '../../Palette';
import { InfoCompleteAutoSelect } from '../Select/';

export default WHeader = ({ onPress, index }) => {

    const { iconS, transparent } = styles;

    return (
        <Header style={{ backgroundColor: Palette.white }} androidStatusBarColor={Palette.theme_color}>
            <WView dial={5} flex>
                <InfoCompleteAutoSelect
                    index={index} />
            </WView>
        </Header>
    )
}

WHeader.propTypes = {
    index: PropTypes.number
}

WHeader.defaultProps = {
    iconName: "angle-left",
    iconType: "FontAwesome"
}

const styles = {
    iconS: {
        fontSize: 33,
        color: Palette.text_color,
        fontWeight: '900',
        paddingRight: 5
    },
    transparent: { border: "none", backgroundColor: 'transparent' }
}