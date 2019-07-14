import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Palette from '../../Palette';
import { WTouchable, WView } from '../../components/common';
import { View, Image, Animated } from 'react-native';

export default class AddProductButton extends PureComponent {
    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            scaleValue: new Animated.Value(0),
            opacityValue: new Animated.Value(0.5)
        }
    }

    componentDidMount = () => {
        const { scaleValue, opacityValue } = this.state;
        Animated.loop(
            Animated.stagger(1000, [
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 500
                }),
                Animated.timing(opacityValue, {
                    toValue: 0,
                    duration: 1000
                })
            ])
        , {
            iterations: 5
        }).start();
    }

    render() {
        const { onPress } = this.props;
        const { scaleValue, opacityValue } = this.state;
        const { floatBtn, icon, floatBtnContainer, floatBtnSubContainer } = styles;
        const addProduct = require('../../images/addshop.png');

        return (
            <View style={[floatBtnContainer]}>
                <Animated.View style={[floatBtnSubContainer, {
                    opacity: opacityValue,
                    transform: [
                        {
                            scale: scaleValue
                        }
                    ]
                }]} />
                <WTouchable onPress={onPress} dial={5} style={[floatBtn]}>
                    <Image source={addProduct} style={icon} />
                </WTouchable>
            </View>
        )
    }
}

const styles = {
    floatBtnContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    floatBtnSubContainer: {
        position: 'absolute',
        backgroundColor: Palette.orange,
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    floatBtn: {
        backgroundColor: Palette.theme_color,
        width: 50,
        height: 50,
        elevation: 3,
        borderRadius: 25
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: Palette.white
    },
}
