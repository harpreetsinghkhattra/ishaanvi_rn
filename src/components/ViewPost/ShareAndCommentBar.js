import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WTouchable, WText } from '../common'
import { Image, StyleSheet } from 'react-native'
import Palette from '../../Palette'

export default class ShareAndCommentBar extends PureComponent {

    static propTypes = {
        onCommentPress: PropTypes.func,
        onSharePress: PropTypes.func,
        onChatPress: PropTypes.func
    }

    render() {
        const { onCommentPress, onSharePress, onChatPress } = this.props;
        const comment = require('../../images/comments.png');
        const share = require('../../images/share.png');
        const chat = require('../../images/chat.png');

        const { container, iconStyle } = styles;

        return (
            <WRow dial={5} margin={[10, 0]} style={container}> 
                <WTouchable dial={5}>
                    <WRow dial={5}>
                        <Image source={chat} style={iconStyle} />
                        <WText padding={[5, 10]} color={Palette.text_color} fontSize={14}>Chat</WText> 
                    </WRow>
                </WTouchable>
                <WTouchable dial={5}>
                    <WRow dial={5}>
                        <Image source={comment} style={iconStyle} />
                        <WText padding={[5, 10]} color={Palette.text_color} fontSize={14}>Comments</WText>
                    </WRow>
                </WTouchable>
                <WTouchable dial={5}>
                    <WRow dial={5}>
                        <Image source={share} style={iconStyle} />
                        <WText padding={[5, 10]} color={Palette.text_color} fontSize={14}>Share</WText>
                    </WRow>
                </WTouchable>
            </WRow>
        )
    }
}

const styles = {
    container: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid',
        borderColor: Palette.border_color 
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: Palette.text_color
    }
}
