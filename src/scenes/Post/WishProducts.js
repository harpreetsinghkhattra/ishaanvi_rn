import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WSpinner } from '../../components/common';
import { ScrollView, PixelRatio } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { ChangeImage, EditActionView, UserInfo } from '../../components/Edit';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { CompleteIndicatorStatus, UploadPhoto } from '../../components/Select/PostOffer';
import { TextInputWithLabel, MultiTextInputWithLabel } from '../../components/UI/input';
import { Section } from '../../components/Label';
import { PostsList } from '../../components/Lists';
import { PostOffer } from '../../model/PostOffer';

import { Api, Socket, User as UserApi } from '../../api';
import { getAddedWishProducts, clearWishProducts } from '../../api/SocketUrls';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 56;

export default class WishProducts extends Component {

    state = {
        isLoading: false,
        products: []
    }

    componentDidMount = () => {
        this.getProducts();
    }


    openScreen = (path, item) => {
        const { history } = this.props;
        history.push(routerNames.view_product, { productId: item._id });
    }

    getProducts = () => {
        const { history } = this.props;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Socket.request(getAddedWishProducts.emit, {
                id,
                accessToken,
                userId: id
            });
            this.getProductsResponse();
        });
    }

    clearAllProducts = () => {
        const { history } = this.props;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Socket.request(clearWishProducts.emit, {
                id,
                accessToken,
                userId: id
            });
            this.clearAllResponse();
        });
    }

    /** On back */
    onBack = () => {
        const { history, location } = this.props;
        if (location.state && location.state.screenType === "edit")
            history.replace(routerNames.index, { selectedIndex: 4 })
        else history.go(-1);
    }

    /** Get response */
    getProductsResponse = () => {
        const { history } = this.props;

        UserApi.getSocketResponseOnce(getAddedWishProducts.on, (res) => {
            console.log("VIEW PRODUCT DATA ===> ", res);
            if (res.message === "Success") {
                this.setState({ isLoading: false, products: res.data });
                return;
            }

            this.setState({ isLoading: false, products: [] });
        });
    }

    /** Clear All Response */
    clearAllResponse = () => {
        const { history } = this.props;

        UserApi.getSocketResponseOnce(clearWishProducts.on, (res) => {
            console.log("VIEW PRODUCT DATA ===> ", res);
            if (res.message === "Success") {
                this.getProducts();
                return;
            }

            this.setState({ isLoading: false });
        });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        let { isLoading, products } = this.state;

        if (products && products.length) products = products.map(ele => ele.productInfo);

        return (
            <WView dial={2} flex style={stretch}>
                <Header
                    onPress={this.onBack.bind(this)}
                    label={"Wish Products"}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        <WView flex dial={2} style={[stretch]}>
                            {
                                products && products.length ?
                                    <WRow dial={4} padding={[5, 0]} style={[{ justifyContent: 'space-between' }]} backgroundColor={"red/"}>
                                        <WText color={Palette.theme_color} fontFamily={"Muli-Bold"} fontSize={18}>Products</WText>

                                        <Large
                                            label="Clear All"
                                            onPress={this.clearAllProducts.bind(this, routerNames.post_offer_detail, {})}
                                            style={{ height: 30 }} />

                                    </WRow> : null
                            }
                            {
                                isLoading ?
                                    <WSpinner size="small" color={Palette.theme_color} />
                                    :
                                    products && products.length ?
                                        <PostsList
                                            {...this.props}
                                            onPress={this.openScreen.bind(this)}
                                            data={products}
                                        />
                                        :
                                        <WView flex dial={5}>
                                            <WText fontSize={15} fontFamily={'Muli-Bold'} center>Your Wishlist is empty</WText>
                                            <WText fontSize={14} padding={[10, 10]} center>Save items that you like in your wishlist.</WText>
                                        </WView>
                            }

                        </WView>
                    </WView>
                </ScrollView>
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
    }
}
