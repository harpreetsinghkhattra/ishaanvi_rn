import React from 'react';
import { Text as RNText, Platform } from 'react-native';
import WStyles from './WStyles';
import Palette from '../../Palette';

const Text = (props) => {
    const {
        lines = 1,
        fontWeight = "300",
        fontStyle = "normal",
        fontFamily = "Muli",
        letterSpacing = 0,
        color = Palette.text_color,
        style,
        center,
        right,
        transparent,
        margin,
        padding,
        onPress
    } = props;
    const textAlign = center ? 'center' : right ? 'right' : null;
    const fontSize = props.fontSize ? props.fontSize : 12;
    const backgroundColor = transparent ? 'transparent' : null;
    const _WStyles = WStyles(margin, padding);

    return (
        <RNText
            onPress={onPress}
            style={[{ fontSize, fontStyle, fontFamily, letterSpacing, textAlign, color, backgroundColor, fontWeight: fontWeight }, _WStyles, style]}
            numberOfLines={lines}
        >
            {props.children}
        </RNText>
    );
}

export default Text;
