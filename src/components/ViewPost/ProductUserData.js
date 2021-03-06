import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WTouchable, WText } from '../common'
import { Image } from 'react-native'
import Palette from '../../Palette'

export default class ProductUserData extends PureComponent {

    render() {
        const location = require('../../images/location.png');
        const { iconStyle, container } = styles;
        const { item } = this.props

        return (
            <WView dial={4} padding={[20, 10]} style={container}>
                <WText padding={[5, 0]} color={Palette.white} fontSize={16} fontFamily={"Muli-Bold"}>Found at: </WText>
                <WRow dial={4} padding={[5, 5]}>
                    <Image source={location} style={iconStyle} />
                    <WText padding={[0, 10]} color={Palette.white} fontSize={14} lines={6}>{item && item.userInfo && item.userInfo.business_address ? item.userInfo.business_address : 'No location found'} {item && item.userInfo && item.userInfo.shopLocation ? `(${parseFloat(`${item.userInfo.shopLocation}`).toFixed(2)}km far off)` : ''}</WText>
                </WRow>
            </WView>
        )
    }
}

const styles = {
    container: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    iconStyle: {
        width: 30,
        height: 30,
        tintColor: Palette.white
    }
}
