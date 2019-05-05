import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WTouchable, WText } from '../common';
import { Image, StyleSheet } from 'react-native';
import Palette from '../../Palette';

export default class SelectProductTypeItem extends Component {

    render() {
        const { container, serpartor } = styles;
        const circle = require('../../images/circle.png');
        let { item } = this.props;

        const { size, color, material, occasion, type, description } = item;

        return (
            <WView>
                <WRow padding={[10, 0]} margin={[0, 0, 10, 0]} dial={5} style={container}>
                    <WText fontSize={14} fontFamily={"Muli-Bold"}>Size: <WText fontSize={14}>{size}</WText></WText>
                    <WText fontSize={14} fontFamily={"Muli-Bold"}>Color: <WText fontSize={14}>{color}</WText></WText>
                </WRow>

                <WView dial={4} padding={[10, 5]} margin={[10, 0]} style={serpartor}>
                    <WText fontFamily={'Muli-Bold'} fontSize={16}>Product Specification</WText>

                    <WText fontFamily={'Muli-Bold'} fontSize={14} color={Palette.orange}>Material</WText>
                    <WText fontSize={14} padding={[5, 0]} lines={100}>{material}</WText>

                    <WText fontFamily={'Muli-Bold'} fontSize={14} color={Palette.orange}>Occasion</WText>
                    <WText fontSize={14} padding={[5, 0]} lines={100}>{occasion}</WText>

                    <WText fontFamily={'Muli-Bold'} fontSize={14} color={Palette.orange}>Type</WText>
                    <WText fontSize={14} padding={[5, 0]} lines={100}>{type}</WText>
                </WView>

                <WView dial={4} padding={[10, 5]} margin={[10, 0]} style={serpartor}>
                    <WText fontFamily={'Muli-Bold'} fontSize={16} color={Palette.text_color}>Description</WText>
                    <WText fontSize={14} padding={[5, 0]} lines={100}>{description}</WText>
                </WView>
            </WView>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'space-between'
    },
    serpartor: {
        elevation: 1,
        borderColor: Palette.line_color        
    }
}