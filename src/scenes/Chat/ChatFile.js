import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner } from '../../components/common';
import { ScrollView, PixelRatio, Image, Keyboard } from 'react-native';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { PostOffer } from '../../model/PostOffer';
import { ChatInput } from '../../components/Card/Chat'
import { ChatMessagesList } from '../../components/Card/Chat'
import { Api, Socket, User as UserApi } from '../../api';
import { sendRealTimeP2PMessage, getProductChatMessage } from '../../api/SocketUrls';
import moment from 'moment';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 80;

export default class ViewPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoading: true,
            messages: [],
            isMessage: false
        }

        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;

        // UserApi.removeSocketResponseOnListner(sendRealTimeP2PMessage.on, () => {
        //     console.log("MESSAGE DATA ===> ", "CHAT LISTNER REMOVED");
        // });
    }

    componentDidMount = () => {
        this.getSendMessageResponse();
        this.getChatMessages();
    }

    getDate(date = new Date(), value = 0) {

        date.setDate(date.getDate() - value);

        return date.toDateString();
    }

    isDatePresentInField = (arr, date) => {
        if (!arr || (arr && !arr.length)) return false;

        return arr.findIndex(ele => ele.date === date) > -1 ? true : false;
    }

    getChatMessages = () => {
        const { location } = this.props;
        const { state } = location;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        const { isLoading } = this.state;

        Socket.request(getProductChatMessage.emit, {
            id,
            accessToken,
            senderId: id,
            receiverId: state.receiverId
        });

        UserApi.getSocketResponseOnce(getProductChatMessage.on, (res) => {

            if (res && res.message === "Success") {

                let tempData = res.data && res.data.length ? Array.from(res.data) : [];
                tempData = Array.from(tempData).map(ele => {
                    ele.isSender = ele.senderId === id ? true : false;
                    ele.time = ele.createdTime ? moment(ele.createdTime).format('hh:mm A') : '';
                    if (this.getDate(new Date(parseInt(ele.createdTime))) === this.getDate()) {
                        ele.date = "today";
                    } else if (this.getDate(new Date(parseInt(ele.createdTime))) === this.getDate(new Date(), 1)) {
                        ele.date = "yesterday";
                    } else {
                        ele.date = moment(ele.createdTime).format("DDMMM, YYYY");
                    }

                    return ele;
                });

                let tempArr = [];
                if (!tempData || tempData && !tempData.length) this._setState({ isLoading: false, messages: [] });
                tempData.forEach((ele, index) => {
                    if (!this.isDatePresentInField(tempArr, ele.date)) {
                        let tempArr1 = Array.from(tempData).filter(message => message.date === ele.date);
                        tempArr1 = tempArr1 && tempArr1.length ? tempArr1.sort((a, b) => a.createdTime - b.createdTime) : [];
                        tempArr.push({
                            date: ele.date,
                            data: tempArr1
                        })
                    }

                    if (tempData && tempData.length - 1 === index) {
                        this._setState({ isLoading: false, messages: Array.from(tempArr).reverse() });
                        console.log("MESSAGE DATA ===> ", tempArr.length);
                    }
                });
            } else this._setState({ isLoading: false, messages: [] });
        });
    }

    pushMessageInChat = (message) => {
        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        this._setState(prevState => {
            const index = prevState.messages.findIndex(ele => ele.date === "today");
            if (index === -1) {
                console.log("MESSAGE DATA ===> DATA DATE NOT FOUND", message, index);
                message.isSender = message.senderId === id ? true : false;
                message.time = message.createdTime ? moment(message.createdTime).format('hh:mm A') : '';
                prevState.messages.push({
                    date: "today",
                    data: [message]
                })
                return { messages: prevState.messages, isMessage: prevState.isMessage ? false : true };
            };

            console.log("MESSAGE DATA ===> DATA ", message, index);
            message.isSender = message.senderId === id ? true : false;
            message.time = message.createdTime ? moment(message.createdTime).format('hh:mm A') : '';
            prevState.messages[index].data.push(message);
            return { messages: prevState.messages, isMessage: prevState.isMessage ? false : true };
        });
    }

    _setState = (value, cb) => {
        if (!this._isMounted) return;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    sendMessage = (message) => {

        if (!message) return null;

        Keyboard.dismiss();

        const { location } = this.props;
        const { state } = location;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        const { isLoading } = this.state;

        Socket.request(sendRealTimeP2PMessage.emit, {
            id,
            accessToken,
            senderId: id,
            receiverId: state.receiverId,
            productId: state.productId ? state.productId : '',
            message
        });
    }

    getSendMessageResponse = () => {
        UserApi.getSocketResponseOn(sendRealTimeP2PMessage.on, (res) => {
            console.log("MESSAGE DATA ===> ", JSON.stringify(res.data));
            const { messages } = this.state;

            if (res && res.message === "Success") {
                if (messages && messages.findIndex(ele => ele._id === res.data._id) === -1)
                    this.pushMessageInChat(res.data);
            }
        });
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data);
    }

    goBack = () => {
        const { history, location } = this.props;
        const { state } = location;

        if (state.screenType === "ChatList") {
            history.replace(routerNames.index, {
                selectedIndex: 3,
                tab: 1
            })
        } else history.go(-1);
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, floatBtn, icon } = styles;
        const { item, isLoading, messages } = this.state;
        const edit = require('../../images/edit.png');

        return (
            <WView dial={2} flex style={stretch}>
                <Header
                    onPress={this.goBack.bind(this)}
                    label={"Product Chat"}
                />
                <WView flex style={[{ minWidth: screenWidth, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        {
                            isLoading ?
                                <WSpinner color={Palette.theme_color} size={"small"} />
                                :
                                <ChatMessagesList
                                    {...this.props}
                                    messages={messages} />
                        }
                    </WView>
                </WView>
                <ChatInput
                    onSend={this.sendMessage.bind(this)} />
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
