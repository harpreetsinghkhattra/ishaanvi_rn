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
import { get_products } from '../../api/SocketUrls';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 56;

export default class Posts extends Component {

    state = {
        isLoading: false,
        products: []
    }

    componentDidMount = () => {
        this.getProducts();
    }


    openScreen = (path, item) => {
        const { history } = this.props;
        history.push(path, { item });
    }

    getProducts = () => {
        const { history } = this.props;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Socket.request(get_products.emit, { id, accessToken });
            this.getProductsResponse();
        });
    }

    /** Get response */
    getProductsResponse = () => {
        const { history } = this.props;

        UserApi.getSocketResponseOnce(get_products.on, (res) => {
            if (res.message === "Success") {
                this.setState({ isLoading: false, products: res.data }); 
                return;
            }

            this.setState({ isLoading: false, products: [] });
        });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, products } = this.state;

        return (
            <WView dial={2} flex style={stretch}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Selling Board"}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        <WView flex dial={2} style={[stretch]}>
                            <WRow dial={4} padding={[5, 0]} style={[{ justifyContent: 'space-between' }]} backgroundColor={"red/"}>
                                <WText color={Palette.theme_color} fontFamily={"Muli-Bold"} fontSize={18}>Products</WText>
                                <Large
                                    label="Add Product"
                                    onPress={this.openScreen.bind(this, routerNames.post_offer_detail, {})}
                                    style={{ height: 30 }}
                                />
                            </WRow>
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
                                        <WText fontSize={15} fontFamily={'Muli-Bold'} center>No Product is Present</WText>
                                        <WText fontSize={14} fontFamily={'Muli-Bold'} center color={Palette.theme_color} onPress={this.openScreen.bind(this, routerNames.post_offer_detail, {})}>Add New Product</WText>
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
