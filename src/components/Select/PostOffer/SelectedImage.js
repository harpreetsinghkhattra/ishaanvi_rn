import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WTouchable } from '../../common'
import { Image } from 'react-native'
import Palette from '../../../Palette'

export default class SelectedImage extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        image: PropTypes.any,
        space: PropTypes.bool,
        deleteImage: PropTypes.func
    }

    render() {
        const { image, onPress, space, deleteImage } = this.props;
        const { container, iconImage, image: imageStyle, topRightBtnContainer } = styles;

        return (
            <WView dial={5} style={[container]} margin={[20, 20]}>
                <Image source={image} style={imageStyle} resizeMode={"cover"} />
                <WTouchable dial={5} padding={[5, 5]} style={topRightBtnContainer} onPress={deleteImage}> 
                    <Image source={require('../../../images/delete.png')} style={iconImage} />
                </WTouchable>
            </WView>
        )
    }
}

const IMAGE_HEIGHT = 150;
const CONTAINER_WIDTH = 170;
const styles = {
    container: {
        alignItems: 'stretch'
    },
    image: {
        width: CONTAINER_WIDTH,
        height: IMAGE_HEIGHT
    },
    iconImage: {
        width: 20,
        height: 20,
        tintColor: Palette.white
    },
    topRightBtnContainer: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Palette.theme_color
    }
}
