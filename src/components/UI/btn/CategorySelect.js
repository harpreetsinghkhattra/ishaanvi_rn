import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from "react-native";
import PropTypes from 'prop-types';
import Palette from '../../../Palette';
import { WRow, WView, WTouchable, WText, Image as WImage } from '../../common';

const CategorySelect = ({ imageSource, onPress, isSelected, label }) => {
    const { selected, unSelected, iconContainer, canvas } = styles;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={
                [
                    { flex: 0.5, minHeight: 200, margin: 5 },
                    isSelected ? selected : unSelected
                ]
            }
            onPress={onPress}
            underlayColor="#EFF1F5"
        >
            <WView dial={5} flex style={{ alignItems: "stretch" }}>
                <WImage
                    source={imageSource}
                />
            </WView>
            <WView dial={5} padding={[10, 10]}>
                <WText fontSize={14} lines={2} center>{label}</WText>
            </WView>
            {
                isSelected &&
                <WView dial={5} padding={[5, 5]} style={iconContainer} backgroundColor={Palette.theme_color}>
                    <Image source={require("../../../images/check.png")} style={{ width: 25, height: 25, tintColor: Palette.white }} />
                </WView>
            }
        </TouchableOpacity>
    );
}

CategorySelect.propTypes = {
    imageSource: PropTypes.any,
    label: PropTypes.string,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool
}

const IMAGE_HEIGHT = 150;
const CONTAINER_WIDTH = 170;

const styles = {
    selected: {
        borderColor: Palette.theme_color,
        borderWidth: 2,
        borderStyle: "solid"
    },
    unSelected: {
        borderColor: "#F7F7F7",
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderStyle: "solid"
    },
    containerSpacing: {
        marginRight: 15,
        marginTop: 5
    },
    imageContainer: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: "hidden"
    },
    textContainer: {
        padding: 8
    },
    iconContainer: {
        position: "absolute",
        width: 30,
        height: 30,
        top: 0,
        right: 0
    },
    canvas: {
        flex: 1,
        width: null,
        height: null
    }
};

export default CategorySelect;
