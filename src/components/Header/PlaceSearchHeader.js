import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'native-base';
import { WText, WTouchable, WRow, WView, WButton, WTextInput } from '../common';
import { Image, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import Palette from '../../Palette';

export default PlaceSearchHeader = ({ onPress, iconName, iconType, label, onChangeText, isLoading, value, onSubmitEditing, placeholderName }) => {

    const { iconS, transparent } = styles;

    return (
        <Header style={{ backgroundColor: Palette.theme_color }} androidStatusBarColor={Palette.theme_color}>
            <WView dial={4} flex>
                <WButton
                    dial={5}
                    containerStyle={{ padding: 10, borderRadius: 20 }}
                    onPress={onPress}
                    component={() =>
                        <WView flex dial={5}>
                            <Image source={require("../../images/close.png")} style={{
                                tintColor: Palette.white, width: 20,
                                height: 20
                            }} />
                        </WView>}
                />
            </WView>
            <WTextInput
                flex={3}
                placeholderName={placeholderName}
                isLoading={isLoading}
                onChangeText={onChangeText}
                containerStyle={{ borderColor: "transparent" }} 
                onSubmitEditing={onSubmitEditing}
                value={value}
            />
            <WView flex dial={5} />
        </Header>
    )
}

PlaceSearchHeader.propTypes = {
    iconType: PropTypes.string,
    iconName: PropTypes.string,
    onPress: PropTypes.func,
    label: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    returnKeyType: PropTypes.string,
    source: PropTypes.any,
    placeholderName: PropTypes.string.isRequired,
    keyboardType: PropTypes.string,
    value: PropTypes.string.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    margin: PropTypes.array,
    padding: PropTypes.array,
    iconPath: PropTypes.any,
    isLoading: PropTypes.bool,
    onChangeText: PropTypes.func
}

PlaceSearchHeader.defaultProps = {
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