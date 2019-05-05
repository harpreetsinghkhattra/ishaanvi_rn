import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WView, WRow, WTouchable, WText } from '../common'
import Palette from '../../Palette';
import { Api, Socket, User as UserApi } from '../../api';
import { addProductToWish, getAddedWishProducts, removeWishProduct } from '../../api/SocketUrls';
import { User } from '../../model/user';
import { routerNames } from '../../RouteConfig';

export default class BottomBar extends PureComponent {

    static propTypes = {
        item: PropTypes.shape({
            leftBtnLabel: PropTypes.string,
            rightBtnLabel: PropTypes.string,
            leftBtnPress: PropTypes.func,
            rightBtnPress: PropTypes.func
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isAddedProduct: false
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
        this.getWishProducts();
    }

    openScreen = (path, item = {}) => {
        const { history } = this.props;
        history.push(path, item);
    }

    addWishProduct = () => {
        const { item } = this.props;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        const { isLoading } = this.state;

        if (isLoading) return;

        this._setState({ isLoading: true });
        Socket.request(addProductToWish.emit, {
            id,
            accessToken,
            userId: id,
            productId: item._id
        });

        UserApi.getSocketResponseOnce(addProductToWish.on, (res) => {
            console.log("VIEW PRODUCT DATA ===> ", JSON.stringify(res));

            if (res && res.message === "Success") {
                this.getWishProducts();
            } else this._setState({ isLoading: false });
        });
    }

    getWishProducts = () => {
        const { item } = this.props;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        const { isLoading } = this.state;

        this._setState({ isLoading: true, isAddedProduct: false });
        Socket.request(getAddedWishProducts.emit, {
            id,
            accessToken,
            userId: id
        });

        UserApi.getSocketResponseOnce(getAddedWishProducts.on, (res) => {
            console.log("VIEW PRODUCT DATA ===> ", JSON.stringify(res));

            if (res && res.message === "Success") {
                this._setState({ isLoading: false, isAddedProduct: res.data && res.data.length ? res.data.findIndex(ele => ele.productInfo._id === item._id) > -1 : false });
            } else this._setState({ isLoading: false, isAddedProduct: false });
        });
    }

    removeWishProduct = () => {
        const { item } = this.props;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        const { isLoading } = this.state;

        this._setState({ isLoading: true });
        Socket.request(removeWishProduct.emit, {
            id,
            accessToken,
            userId: id,
            productId: item._id
        });

        UserApi.getSocketResponseOnce(removeWishProduct.on, (res) => {
            console.log("VIEW PRODUCT DATA ===> ", JSON.stringify(res));

            if (res && res.message === "Success") {
                this.getWishProducts();
            } else this._setState({ isLoading: false });
        });
    }

    render() {
        const { leftBtnLabel, rightBtnLabel, leftBtnPress, rightBtnPress, centerBtnLabel, centerBtnPress } = this.props;
        const { btnStyle, centerBtnStyle, container } = styles;
        const { isLoading, isAddedProduct } = this.state;

        return (
            <WRow dial={5} style={container}>
                <WTouchable onPress={isLoading ? () => { } : isAddedProduct ? this.removeWishProduct.bind(this) : this.addWishProduct.bind(this)} dial={5} style={btnStyle}>
                    <WText fontSize={12} lines={2} padding={[5]} center fontFamily={"Muli-Bold"} color={Palette.text_color}>{isLoading ? "Loading..." : isAddedProduct ? "Remove From WishList" : leftBtnLabel}</WText>
                </WTouchable>
                <WTouchable onPress={centerBtnPress} dial={5} style={centerBtnStyle}>
                    <WText fontSize={12} lines={2} padding={[5]} center fontFamily={"Muli-Bold"} color={Palette.white}>{centerBtnLabel}</WText>
                </WTouchable>
                <WTouchable dial={5} style={btnStyle} onPress={rightBtnPress}>
                    <WText fontSize={12} fontFamily={"Muli-Bold"} color={Palette.text_color}>{rightBtnLabel}</WText>
                </WTouchable>
            </WRow>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        height: 50,
        borderRadius: 25,
        borderColor: Palette.theme_color,
        borderWidth: 1,
        elevation: 2,
        borderStyle: 'solid',
        backgroundColor: Palette.white,
        alignItems: 'stretch'
    },
    btnStyle: {
        flex: 1
    },
    centerBtnStyle: {
        flex: 1,
        backgroundColor: Palette.theme_color
    }
}