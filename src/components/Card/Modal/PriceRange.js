import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WButton, WTextInput, WText, WTouchable } from '../../common';
import { Image, Keyboard } from 'react-native';
import Palette from '../../../Palette';
import { User } from '../../../model/user';

export default class PriceRange extends Component {

    state = {
        minPrice: 0,
        maxPrice: 0
    }

    static propTypes = {
        price: PropTypes.array,
        onPriceChange: PropTypes.func
    }


    /** On text change */
    onChangeText = (key, value) => this.setState(() => ({ [key]: value }), () => {
        const { minPrice, maxPrice } = this.state;
        const { onPriceChange } = this.props;
        onPriceChange(parseFloat(minPrice).toFixed(2), parseFloat(maxPrice).toFixed(2));
    });

    componentWillReceiveProps(nextProps) {
        const { price } = nextProps;

        if (price && price.length === 2) this.setState({ minPrice: price[0], maxPrice: price[1] });
    }

    render() {
        const { textInputContainer, textInputContainerStyle, btnContainerStyle, btnContainerStyle1, stretch, iconStyle } = styles
        const { minPrice, maxPrice } = this.state;
        const { openFilter } = this.props;
        const location = User.getUserData().location;

        return (
            <WView dial={2} padding={[5, 0]} style={stretch}>
                <WText fontFamily={"Muli-Bold"} fontSize={14} color={Palette.text_color} left>Price</WText>
                <WRow dial={5} padding={[0, 0]} flex style={textInputContainer}>
                    <WTextInput
                        getFocus={ref => this.input1 = ref}
                        containerStyle={textInputContainerStyle}
                        placeholderName="Min"
                        value={`${minPrice}`}
                        keyboardType={"numeric"}
                        onChangeText={value => this.onChangeText('minPrice', value)}
                        style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold' }}
                        onSubmitEditing={() => { this.input2 && this.input2.focus() }}
                    /> 
                    <WTextInput
                        getFocus={ref => this.input2 = ref}
                        containerStyle={textInputContainerStyle} 
                        placeholderName="Max"
                        value={`${maxPrice}`}
                        keyboardType={"numeric"}
                        onChangeText={value => this.onChangeText('maxPrice', value)}
                        style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold' }}
                        onSubmitEditing={() => { this.input2 && this.input2.blur() }}
                    />
                </WRow>
            </WView>
        )
    }
}

const styles = {
    stretch: {
        alignItems: "stretch"
    },
    textInputContainer: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Palette.white,
        backgroundColor: Palette.white,
        justifyContent: 'space-between'
    },
    textInputContainerStyle: {
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Palette.white,
        borderWidth: 1,
        borderColor: Palette.theme_color,
        borderStyle: 'solid',
        borderRadius: 5
    },
    btnContainerStyle: {
        borderLeftWidth: 1,
        borderColor: Palette.line_color,
        borderStyle: "solid"
    },
    btnContainerStyle1: {
        height: 40,
        borderRadius: 5,
        backgroundColor: Palette.white
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: Palette.border_color
    }
}
