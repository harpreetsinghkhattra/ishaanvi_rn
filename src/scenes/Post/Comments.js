import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable } from '../../components/common';
import { ScrollView, PixelRatio, Image } from 'react-native';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { PostOffer } from '../../model/PostOffer';
import { CommentInput } from '../../components/ViewPost'
import { CommentsList } from '../../components/Card/Chat'
import { Api, Socket, User as UserApi } from '../../api';
import { createComments, getComments } from '../../api/SocketUrls';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 90;

export default class ViewPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoading: true
        }

        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount = () => {
        this.getComments();
    }


    _setState = (value, cb) => {
        if (!this._isMounted) return;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data);
    }

    createComments = (message) => {

        if (!message) return null;

        const { location } = this.props;
        const { state } = location;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        const { isLoading } = this.state;

        Socket.request(createComments.emit, {
            id,
            accessToken,
            productId: state.productId,
            userId: id,
            message
        });

        UserApi.getSocketResponseOnce(createComments.on, (res) => {
            console.log("COMMENTS PRODUCT DATA ===> ", JSON.stringify(res.data));

            if (res && res.message === "Success") {
                this._setState({ items: res.data && res.data.length ? res.data : [] });
            } else this._setState({ items: [] })
        });
    }

    getComments = () => {
        const { location: LocationRN } = this.props;
        const { state } = LocationRN;
        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();

        Socket.request(getComments.emit, {
            id,
            accessToken,
            productId: state.productId
        });

        UserApi.getSocketResponseOnce(getComments.on, (res) => {
            console.log("GET COMMENTS DATA ===> ", res.data);

            if (res && res.message === "Success") {
                this._setState({ items: res.data && res.data.length ? res.data : [], isLoading: false })
                setTimeout(() => {
                    this.commentListRef && this.commentListRef.scrollToEnd();
                }, 500);
            } else this._setState({ items: [], isLoading: false });
        });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, floatBtn, icon } = styles;
        const { items, isLoading } = this.state;
        const edit = require('../../images/edit.png');

        return (
            <WView dial={2} flex style={[stretch]}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Comments"}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        <CommentsList
                            getCommentListRef={ref => this.commentListRef = ref}
                            loading={isLoading}
                            items={items} />
                    </WView>
                </ScrollView>
                <CommentInput
                    onSend={this.createComments.bind(this)} />
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
