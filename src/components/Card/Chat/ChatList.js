import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image, StyleSheet } from 'react-native'
import { WRow, WView, WText, WTouchable } from '../../common'
import Palette from '../../../Palette'
import { getAllProductChatUsersList } from '../../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../../api';
import { User } from '../../../model/user';
import { routerNames } from '../../../RouteConfig';

export default class ChatList extends PureComponent {

    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            users: []
        }

        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _setState = (value, cb) => {
        if (!this._isMounted) return;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    componentDidMount = () => {
        this.getAllUsers();
    }

    getAllUsers = () => {
        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        Socket.request(getAllProductChatUsersList.emit, {
            id,
            accessToken,
            userId: id
        });

        UserApi.getSocketResponseOnce(getAllProductChatUsersList.on, (res) => {
            if (res && res.message === "Success") {
                this._setState({ isLoading: false, users: res.data && res.data.length ? res.data.filter((ele, index) => index === res.data.findIndex(info => info.receiver === ele.receiver)) : [] });
            } else this._setState({ isLoading: false, users: [] });
        });
    }

    openScreen = (path, value) => {
        const { history } = this.props;

        history.push(path, value);
    }

    renderItem = ({ item, index }) => {
        const { userImageStyle, productImageStyle, container } = styles;
        const { receiverInfo, message } = item;
        const image = receiverInfo && receiverInfo.imageUrl ? { uri: receiverInfo.imageUrl } : require('../../../images/profile.png')

        return (
            <WTouchable onPress={this.openScreen.bind(this, routerNames.chat_room, {
                screenType: 'ChatList',
                receiverId: item.receiverInfo._id,
                image: item && item.receiverInfo && item.receiverInfo.imageUrl ? { uri: item.receiverInfo.imageUrl } : require("../../../images/profile.png")
            })} dial={5} style={container}>
                <WRow dial={5}>
                    <WView dial={5}>
                        <Image source={image} style={userImageStyle} resizeMode={"center"} />
                    </WView>
                    <WView dial={4} flex padding={[10, 10]}>
                        <WText fontFamily={"Muli-Bold"} fontSize={14}>{receiverInfo.name}</WText>
                        <WText fontFamily={"Muli-Bold"}>{message}</WText>
                    </WView>
                    {/*<WView dial={5} >
                        <Image source={require('../../../images/no_product.png')} style={productImageStyle} resizeMode={"center"} />
                    </WView>*/}
                </WRow>
            </WTouchable>
        )
    }

    render() {
        const { isLoading, users } = this.state;

        if (isLoading)
            return (
                <WView dial={5}>
                    <WSpinner size={"small"} color={Palette.theme_color} />
                    <WText color={Palette.theme_color} >Please wait...</WText>
                </WView >
            );

        return (
            <FlatList
                keyExtractor={(item, index) => `chat-list-${index}`}
                data={users}
                style={{ flexGrow: 1, marginBottom: 60 }}
                renderItem={this.renderItem.bind(this)}
            />
        )
    }
}

const styles = {
    userImageStyle: { width: 60, height: 60, borderRadius: 30, margin: 5 },
    productImageStyle: { width: 80, height: 80, borderRadius: 40 },
    container: {
        alignItems: "stretch",
        borderColor: Palette.line_color,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid'
    }
}