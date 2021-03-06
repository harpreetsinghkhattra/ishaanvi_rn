import React from 'react'
import PropTypes from 'prop-types'
import { WView, WText, WTouchable, WSpinner, WButton, WRow } from '../../common'
import { TouchableNativeFeedback, Image } from 'react-native'
import Palette from '../../../Palette'

export default WithLeftIcon = ({ isLoading, isLoadingLoader, onPress, style, label, iconStyle, iconPath }) => {

    const { container } = styles;

    return (
        <WButton
            dial={5}
            onPress={isLoading ? () => { } : onPress}
            fontSize={16}
            component={() =>
                isLoadingLoader ?
                    <WRow flex={5}>
                        <WSpinner size="small" color={Palette.white} />
                    </WRow>
                    : <WRow flex dial={5}>
                        <Image source={iconPath} style={iconStyle} />
                        <WText fontSize={16} fontFamily="Muli-Bold" color={Palette.white} fontWeight="bold" padding={[0, 10]}>{label}</WText>
                    </WRow>
            }
            containerStyle={[container, style]} />
    )
}

WithLeftIcon.propTypes = {
    isLoading: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.any,
    label: PropTypes.string,
    iconPath: PropTypes.any,
    iconStyle: PropTypes.any,
    isLoadingLoader: PropTypes.bool
}

WithLeftIcon.defaultProps = {
    iconStyle: {
        width: 16,
        height: 16,
        tintColor: Palette.white
    },
    isLoadingLoader: false
}

const styles = {
    container: {
        backgroundColor: Palette.theme_color,
        alignSelf: "stretch",
        height: 52,
        borderRadius: 5
    }
}