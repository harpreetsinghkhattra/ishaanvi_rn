import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WView, WText } from '../../components/common';
import { Image } from 'react-native';

export default class Template extends PureComponent {
    static propTypes = {

    }

    render() {
        const { label, source, screenWidth } = this.props;
        return (
            <WView flex padding={[20, 10]} dial={5}>
                <WText fontSize={20} fontFamily={"Muli-Bold"} lines={3} center>{label}</WText>
                <Image source={source} style={{ flex: 1 }} resizeMode="contain" />
            </WView>
        )
    }
}
