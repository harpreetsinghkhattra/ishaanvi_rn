import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WTouchable, WText } from '../common';
import { Image, StyleSheet } from 'react-native';
import Palette from '../../Palette';

export default class SelectProductTypeItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        selected: PropTypes.bool,
        onPress: PropTypes.func,
        isError: PropTypes.object
    }

    static defaultProps = {
        selected: false
    }

    render() {
        const { container, image, stretch, subContainer } = styles;
        const { item, onPress } = this.props;
        const { itemCode, name, price, discount, status, images } = item;

        return (
            <WTouchable dial={5} style={[stretch, container]} onPress={onPress}>
                <WRow dial={5} style={[stretch]} padding={[5, 0]}>
                    <Image source={{ uri: images && images.length ? images[0] : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4idCXJDfaeZP6TVEynolhQN4cXZw0Mh9QFyQTIGEBEum5Xsz_' }} style={image} resizeMode="cover" />
                    <WView flex dial={4} padding={[5, 5]}>
                        <WText fontSize={14} fontFamily={"Muli-Bold"} style={{ textTransform: 'capitalize'}}>{`${name}`}</WText>
                        <WText fontSize={14}>{`CODE: ${itemCode}`}</WText>
                        <WText color={Palette.border_color} style={[{ textDecorationLine: 'line-through' }]}>{`₹ ${parseFloat(price).toFixed(2)}`}</WText>
                        <WRow dial={5} style={subContainer}>
                            <WText>{`₹ ${parseFloat((parseFloat(price) - (parseFloat(discount) / 100) * parseFloat(price))).toFixed(2)}`}</WText>
                            {
                                status && parseInt(status) === 1 ? 
                                    <WText fontFamily={"Muli-Bold"} color={Palette.theme_color}>Active</WText>
                                    :
                                    <WText fontFamily={"Muli-Bold"} color={Palette.red}>Not Active</WText>
                            }
                        </WRow>
                    </WView>
                </WRow>
            </WTouchable>
        );
    }
}

const styles = {
    stretch: {
        alignSelf: 'stretch'
    },
    container: {
        justifyContent: 'space-between',
        borderColor: Palette.line_color,
        borderTopWidth: StyleSheet.hairlineWidth * 2,
        borderStyle: 'solid'
    },
    image: {
        width: 100,
        height: 100
    },
    subContainer: {
        justifyContent: 'space-between',
        alignSelf: 'stretch'
    }
}