import React from 'react'
import PropTypes from 'prop-types'
import { WView, WText, WTouchable, WSpinner, WButton } from '../../common'
import { TouchableNativeFeedback } from 'react-native'
import Palette from '../../../Palette'

export default Large = ({ isLoading, flex, onPress, style, label, color, margin }) => {

    const { container } = styles;

    return (
        <WButton
            dial={5}
            flex={flex}
            margin={margin}
            onPress={onPress}
            isLoading={isLoading}
            loadingColor={color}
            fontSize={16}
            component={() => <WText fontSize={14} fontFamily="Muli-Bold" color={color} padding={[0, 10]}>{label}</WText>}
            containerStyle={[container, style]} />
    )
}

Large.propTypes = {
    isLoading: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.any,
    label: PropTypes.string,
    color: PropTypes.string,
    flex: PropTypes.number,
    margin: PropTypes.array
}

Large.defaultProps = {
    color: Palette.white
}

const styles = {
    container: {
        backgroundColor: Palette.theme_color,
        alignSelf: "stretch",
        height: 52,
        borderRadius: 5
    }
}