import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WView, WText, Image } from '../common';
import Palette from '../../Palette';

export default class ChangeImage extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        imageSource: PropTypes.any
    }

    render() {
        const { onPress, imageSource } = this.props;
        const { image } = styles;

        return (
            <WView dial={5} padding={[20, 0]}>
                <Image source={imageSource} imageStyle={image} />
                <WText onPress={onPress} padding={[5, 10]} color={Palette.theme_color} fontSize={14} fontFamily={"Muli-Bold"}>Change Image</WText>
            </WView>
        )
    }
}

const styles = {
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'red'
    }
}