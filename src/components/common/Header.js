import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'native-base';
import { WText, WTouchable, WRow, WView, WButton } from './';
import { Image, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import Palette from '../../Palette';

export default WHeader = ({ onPress, iconName, iconType, label, isLoading }) => {

    const { iconS, transparent } = styles;

    return (
        <Header style={{ backgroundColor: Palette.theme_color }} androidStatusBarColor={Palette.theme_color}>
            <WView dial={4} flex>
                <WButton
                    dial={5}
                    containerStyle={{ padding: 10, borderRadius: 20 }}
                    onPress={isLoading ? () => { } : onPress}
                    component={() =>
                        <WView flex dial={5}>
                            <Image source={require("../../images/back.png")} style={{
                                tintColor: Palette.white, width: 20,
                                height: 20
                            }} />
                        </WView>}
                />
            </WView>
            <WView dial={5} flex={2}>
                <WText color={Palette.white} fontSize={16} fontWeight={"bold"} fontFamily="Muli-Bold">{label}</WText>
            </WView>
            <WView flex dial={5} />
        </Header>
    )
}

WHeader.propTypes = {
    iconType: PropTypes.string,
    iconName: PropTypes.string,
    onPress: PropTypes.func,
    label: PropTypes.string,
    isLoading: PropTypes.bool
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