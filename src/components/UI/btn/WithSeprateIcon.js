import React from 'react'
import PropTypes from 'prop-types'
import { WView, WText, WTouchable, WSpinner, WButton, WRow } from '../../common'
import { TouchableNativeFeedback, Image } from 'react-native'
import Palette from '../../../Palette'

export default WithLeftIcon = ({ isLoading, onPress, style, label, iconStyle, iconPath, isLeftIcon, isRightIcon }) => {

    const { container, border } = styles;

    return (
        <WButton
            dial={5}
            onPress={onPress}
            fontSize={16}
            component={() =>
                <WRow flex dial={5}>
                    {
                        isLeftIcon &&
                        <WView dial={5} style={[border, { borderRightWidth: 0.8, alignSelf: "stretch" }]}>
                            <Image source={iconPath} style={iconStyle} />
                        </WView>
                    }
                    <WView dial={5}>
                        <WText fontSize={16} fontFamily="Muli-Bold" color={Palette.white} padding={[0, 10]}>{label}</WText>
                    </WView>
                    {
                        isRightIcon &&
                        <WView dial={5} style={[border, { borderLeftWidth: 0.8, alignSelf: "stretch" }]}>
                            <Image source={iconPath} style={iconStyle} />
                        </WView>
                    }
                </WRow>}
            containerStyle={[container, style]} />
    )
}

WithLeftIcon.propTypes = {
    isLoading: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.any,
    label: PropTypes.string,
    iconPath: PropTypes.any,
    isLeftIcon: PropTypes.bool,
    isRightIcon: PropTypes.bool,
    iconStyle: PropTypes.any
}

WithLeftIcon.defaultProps = {
    iconStyle: {
        width: 25,
        height: 25,
        tintColor: Palette.white,
    },
    iconPath: require('../../../images/left_arrow_btn.png'),
    label: "Label"
}

const styles = {
    container: {
        backgroundColor: Palette.theme_color,
        alignSelf: "stretch",
        height: 52,
        borderRadius: 5
    },
    border: {
        borderColor: Palette.border_color,
        borderStyle: "solid"
    }
}