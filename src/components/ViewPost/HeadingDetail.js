import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WTouchable, WText } from '../common';
import { Image, StyleSheet } from 'react-native';
import Palette from '../../Palette';

export default class SelectProductTypeItem extends Component {

    render() {
        const { container, image, stretch, leftContainer, rightContainer } = styles;
        let { item } = this.props;

        const { name, price, discount, views } = item;
        const star = require('../../images/star.png');
        const next = require('../../images/next.png');
        const view = require('../../images/show_password.png');

        return (
            <WRow dial={5} style={[stretch, container]}>
                <WView flex dial={4} style={[leftContainer]}>
                    <WText fontFamily={'Muli-Bold'} fontSize={16} lines={2} style={{ textTransform: 'uppercase' }}>{name}</WText>
                    <WRow dial={4}>
                        <WText color={Palette.ratingColor} padding={[5, 5, 5, 0]}>4.3</WText>
                        <Image source={star} style={[image, { tintColor: Palette.ratingColor }]} />

                        <WText padding={[5, 5, 5, 10]}>3026 Reviews</WText>
                        <Image source={next} style={[image, { tintColor: Palette.text_color }]} />
                    </WRow>
                    <WRow dial={4}>
                        <WText color={Palette.text_color} padding={[5, 5, 5, 0]}>{views ? views : 0}</WText>
                        <Image source={view} style={[image, { tintColor: Palette.text_color }]} />
                    </WRow>
                </WView>
                <WView flex dial={6} style={rightContainer}>
                    <WText right padding={[5, 0]} color={Palette.line_color}>from <WText right color={Palette.line_color} style={[{ textDecorationLine: 'line-through' }]}>{`₹${price}`}</WText></WText>
                    <WText center padding={[5, 0]} fontSize={16} fontFamily={"Muli-Bold"}>{`₹ ${parseFloat((parseFloat(price) - (parseFloat(discount) / 100) * parseFloat(price))).toFixed(2)}`}</WText>
                    <WText center padding={[5, 0]} style={[{ backgroundColor: Palette.theme_color }]} color={Palette.white} padding={[5, 10]}>{`Save ${discount}%`}</WText>
                </WView>
            </WRow>
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
        width: 15,
        height: 15
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