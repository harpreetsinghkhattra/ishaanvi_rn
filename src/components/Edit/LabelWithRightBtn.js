import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WTouchable, WRow, WSpinner, WText } from '../common';
import { Image, StyleSheet } from 'react-native';
import Palette from '../../Palette';
import { Section, WithInfo } from '../Label';

export default class LabelWithRightBtn extends Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        onPress: PropTypes.func,
        imageSource: PropTypes.any,
        label: PropTypes.string
    }

    static defaultProps = {
        imageSource: require("../../images/right_arrow_btn.png")
    }

    render() {
        const { imageSource, isLoading, onPress, label, component } = this.props;
        const { container, image, stretch } = styles;

        return (
            <WTouchable onPress={isLoading ? () => { } : onPress} style={stretch}>
                <WRow padding={[10, 10]} style={[container, stretch]}>
                    <WText fontSize={14} fontFamily={"Muli-Bold"}>{label}</WText>
                    {
                        isLoading ?
                            <WSpinner size={"small"} />
                            :
                            component ?
                                component()
                                :
                                <Image source={imageSource} style={image}/>
                    }
                </WRow>
            </WTouchable>
        )
    }
}

const styles={
    container: {
        borderColor: "#F7F7F7",
        borderBottomWidth: StyleSheet.hairlineWidth * 2, 
        justifyContent: 'space-between'
    },
    stretch: {
        alignItems: 'stretch'
    },  
    image: {
        width: 24,
        height: 24,
        tintColor: Palette.text_color
    }
}
