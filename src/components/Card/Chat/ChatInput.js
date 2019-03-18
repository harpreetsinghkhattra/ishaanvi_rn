import React, { Component } from 'react'
import { WRow, WView, WButton, WTextInput, WText, WTouchable } from '../../common';
import { Image, Keyboard } from 'react-native';
import Palette from '../../../Palette';

export default class SearchHeader extends Component {

    state = {
        isLocationModalVisible: false,
        comment: ''
    }

    constructor(props) {
        super(props);

        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    _setState = (value, cb) => {
        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    onChangeText(key, value) {
        this._setState({ [key]: value });
    }

    onSubmit = (value) => {
        const { onSend } = this.props;
        onSend(value);
        this.onChangeText("comment", "");
    }

    render() {
        const { container, textInputContainer, textInputContainerStyle, btnContainerStyle, btnContainerStyle1, stretch, iconStyle } = styles
        const send = require('../../../images/send.png');
        const { onSend } = this.props;
        const { comment } = this.state;

        return (
            <WRow dial={5} padding={[5, 10]} styles={container} backgroundColor={Palette.line_color}>
                <WRow dial={5} padding={[0, 5]} flex style={textInputContainer}>
                    <WTextInput
                        flex={1}
                        multiline={true}
                        numberOfLines={3}
                        getFocus={ref => this.input1 = ref}
                        containerStyle={textInputContainerStyle}
                        placeholderName="Say something"
                        onChangeText={value => this.onChangeText('comment', value)}
                        value={comment}
                        style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold' }}
                        onSubmitEditing={() => { }}
                    />
                    <WTouchable onPress={this.onSubmit.bind(this, comment)} dial={5} padding={[0, 10]} style={btnContainerStyle}>
                        <Image source={send} style={iconStyle} />
                    </WTouchable>
                </WRow>
            </WRow>
        )
    }
}

const styles = {
    stretch: {
        alignItems: "stretch"
    },
    container: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        height: 0,
        minHeight: 40
    },
    textInputContainer: {
        height: 0,
        minHeight: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Palette.white,
        backgroundColor: Palette.white
    },
    textInputContainerStyle: {
        height: 0,
        minHeight: 40,
        justifyContent: 'center',
        borderBottomWidth: 0,
        alignItems: 'center',
        backgroundColor: Palette.white
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
