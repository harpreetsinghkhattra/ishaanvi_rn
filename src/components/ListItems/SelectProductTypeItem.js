import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WTouchable, WText } from '../common';
import { Image } from 'react-native';
import Palette from '../../Palette';

export default class SelectProductTypeItem extends Component {
    static propTypes = {
        label: PropTypes.string,
        selected: PropTypes.bool,
        onPress: PropTypes.func,
        isError: PropTypes.object
    }

    static defaultProps = {
        selected: false
    }

    render() {
        const checked = require('../../images/checked.png');
        const unChecked = require('../../images/unChecked.png');
        const { selected, label, onPress, isError } = this.props;
        const { container, stretch, image } = styles;

        return (
            <WRow dial={5} style={[container]}>
                <WView dial={4} style={stretch}>
                    <WText fontSize={14} padding={[0, 10, 0, 0]} lines={2}>{label}</WText>
                </WView>
                <WTouchable dial={6} padding={[5, 10]} onPress={onPress}>
                    <Image source={selected ? checked : unChecked} style={[image, { tintColor: isError && isError.status ? Palette.red : Palette.black }]} />
                </WTouchable>
            </WRow>
        )
    }
}

const styles = {
    stretch: {
        alignSelf: 'stretch'
    },
    container: {
        justifyContent: 'space-between',
        backgroudColor: Palette.line_color
    },
    image: {
        width: 25,
        height: 25,
        tintColor: Palette.black
    }
}