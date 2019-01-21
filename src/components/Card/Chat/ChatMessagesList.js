import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image, SectionList } from 'react-native'
import Palette from '../../../Palette'
import { WRow, WView, WTouchable, WText } from '../../common'
import moment from 'moment'

export default class ChatMessagesList extends Component {

    static propTypes = {
        loading: PropTypes.bool,
        items: PropTypes.array,
        getCommentListRef: PropTypes.func
    }

    renderItem = ({ item, index }) => {
        return item.isSender ? this.renderSenderItem(item, index) : this.renderReceiverItem(item, index);
    }

    renderReceiverItem = (item, index) => {
        const { userImage, messageContainer } = styles;
        const { message, time, image } = item;
        const { location } = this.props;
        const { state } = location;

        return (
            <WRow dial={1} padding={[0, 5]}>
                <WView dial={2}>
                    <Image source={state.image} style={userImage} />
                </WView>
                <WView dial={4} flex={0.8}>
                    <WView dial={4} padding={[10, 10]} margin={[0, 5]} flex style={[messageContainer]} backgroundColor={Palette.line_color}>
                        <WText color={Palette.black} lines={100000} fontSize={14}>{message}</WText>
                    </WView>
                    <WView dial={6}>
                        <WText lines={1000} color={Palette.border_color} right>{time}</WText>
                    </WView>
                </WView>
            </WRow>
        );
    }

    renderSenderItem = (item, index) => {
        const { userImage, messageContainerRight } = styles;
        const { message, time } = item;

        return (
            <WRow dial={3} padding={[0, 5]}>
                <WView dial={6} flex={0.7}>
                    <WView dial={4} padding={[10, 10]} margin={[0, 5]} flex style={[messageContainerRight]} backgroundColor={Palette.theme_color}>
                        <WText color={Palette.white} lines={100000} fontSize={14}>{message}</WText>
                    </WView>
                    <WView dial={6} padding={[0, 10]} margin={[0, 5]}>
                        <WText lines={1000} color={Palette.border_color} right>{time}</WText>
                    </WView>
                </WView>
            </WRow>
        );
    }

    render() {
        const { loading, items, getCommentListRef, messages } = this.props;
        // const messages = [
        //     {
        //         date: 'Today', data: [
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' }
        //         ]
        //     },
        //     {
        //         date: 'Yesterday', data: [
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: false, data: { message: "Hello, hi are you bro." }, time: '11 AM' },
        //             { isSender: true, data: { message: "Hello, hi are you bro." }, time: '11 AM' }
        //         ]
        //     },
        // ];

        if (loading)
            return (
                <WView dial={5} flex>
                    <WSpinner size={"small"} color={Palette.theme_color} />
                    <WText color={Palette.theme_color} center>Please wait...</WText>
                </WView>
            );

        return (
            <SectionList
                renderSectionHeader={({ section: { date } }) => (
                    <WView dial={5} margin={[10, 10]}>
                        <WText color={Palette.border_color} fontSize={14}>{date}</WText>
                    </WView>
                )}
                sections={messages && messages.length ? messages : []}
                ref={getCommentListRef}
                style={{ flex: 1 }}
                keyExtractor={(item, index) => `comment-list-${index}`}
                renderItem={this.renderItem.bind(this)}
            />
        )
    }
}

const styles = {
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    messageContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    messageContainerRight: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    }
}
