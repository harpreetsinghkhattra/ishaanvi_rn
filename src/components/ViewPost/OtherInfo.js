import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WTouchable, WText } from '../common';
import { Image, StyleSheet } from 'react-native';
import Palette from '../../Palette';

export default class SelectProductTypeItem extends Component {

    render() {
        const { container, image, stretch, leftContainer, rightContainer } = styles;
        const circle = require('../../images/circle.png');

        return (
            <WView>
                <WRow padding={[10, 0]} dial={5} style={container}>
                    <WText fontSize={14} fontFamily={"Muli-Bold"}>Size: <WText fontSize={14}>15</WText></WText>
                    <WText fontSize={14} fontFamily={"Muli-Bold"}>Color: <WText fontSize={14}>green</WText></WText>
                </WRow>

                <WText fontFamily={'Muli-Bold'} fontSize={14}>Highlights</WText>
                <WRow dial={1}>
                    <Image source={circle} style={[image, { tintColor: Palette.text_color }]} />
                    <WText fontSize={14} padding={[5, 5]} lines={100}>Get one to one with nature as you hike through forests, waterfall & landscapes</WText>
                </WRow>
                <WRow dial={1}>
                    <Image source={circle} style={[image, { tintColor: Palette.text_color }]} />
                    <WText fontSize={14} padding={[5, 5]} lines={100}>Get one to one with nature as you hike through forests, waterfall & landscapes</WText>
                </WRow>
                <WRow dial={1}>
                    <Image source={circle} style={[image, { tintColor: Palette.text_color }]} />
                    <WText fontSize={14} padding={[5, 5]} lines={100}>Get one to one with nature as you hike through forests, waterfall & landscapes</WText>
                </WRow>

                <WText fontFamily={'Muli-Bold'} fontSize={14}>Description</WText>
                <WRow dial={1}>
                    <Image source={circle} style={[image, { tintColor: Palette.text_color }]} />
                    <WText fontSize={14} padding={[5, 5]} lines={100}>Get one to one with nature as you hike through forests, waterfall & landscapes</WText>
                </WRow>
            </WView>
        );
    }
}

const styles = {
    stretch: {
        alignSelf: 'stretch'
    },
    container: {
        justifyContent: 'space-between'
    },
    image: {
        width: 10,
        height: 10,
        marginTop: 11
    },
    leftContainer: {
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    rightContainer: {
        justifyContent: 'space-between',
        width: 100
    }
}