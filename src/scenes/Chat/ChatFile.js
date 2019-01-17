import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable } from '../../components/common';
import { ScrollView, PixelRatio, Image } from 'react-native';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { PostOffer } from '../../model/PostOffer';
import { Api } from '../../api/Api';
import { ChatInput } from '../../components/Card/Chat'
import { ChatMessagesList } from '../../components/Card/Chat'

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 80;

export default class ViewPost extends Component {

    state = {
        item: {}
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data);
    }


    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, floatBtn, icon } = styles;
        const { item } = this.state;
        const edit = require('../../images/edit.png');
        const { images } = item;

        return (
            <WView dial={2} flex style={stretch}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Product Chat"}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        <ChatMessagesList
                            item={[1, 2, 3, 4, 5]} />
                    </WView>
                </ScrollView>
                <ChatInput
                    onSend={(value) => alert(`${value}`)} />
            </WView >
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    },
    btnStyle: {
        backgroundColor: Palette.create_add_continue_btn,
        alignSelf: "stretch",
        height: 52,
        borderRadius: 5
    },
    btnContainer: {
        height: 74
    },
    border: {
        borderStyle: "solid",
        borderBottomWidth: (5 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.theme_color
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: Palette.white
    },
    floatBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: Palette.theme_color,
        width: 50,
        height: 50,
        borderRadius: 25
    }
}
