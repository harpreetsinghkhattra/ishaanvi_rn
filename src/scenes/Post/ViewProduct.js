import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable } from '../../components/common';
import { ScrollView, PixelRatio, Image, Platform, PermissionsAndroid } from 'react-native';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { Section } from '../../components/Label';
import { PostOffer } from '../../model/PostOffer';
import { HeadingDetail, OtherInfo, ImageSlider, BottomBar, ShareAndCommentBar, ProductUserData } from '../../components/ViewPost';
import { RecentProductsList } from '../../components/Lists';
import { Api, Socket, User as UserApi } from '../../api';
import { markProductAsViewed, getProductViaId } from '../../api/SocketUrls';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 50;

export default class ViewPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: {},
            isLoading: true,
            productData: {}
        }

        this._isMounted = true;
    }

    componentWillUnMount = () => {
        this._isMounted = false;
    }

    _setState = (value, cb) => {
        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    getMarkedAsViewedProductResponse = () => {
        const { location } = this.props;
        const { state } = location;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        const { isLoading } = this.state;

        Socket.request(markProductAsViewed.emit, {
            id,
            accessToken,
            productId: state.productId
        });

        UserApi.getSocketResponseOnce(markProductAsViewed.on, (res) => {
            console.log("VIEW PRODUCT DATA ===> ", JSON.stringify(res.data));

            if (res && res.message === "Success") {
                this.getProductViaId();
            } else if (res && res.message === "NoChange") {
                alert("No Change")
                this._setState({ isLoading: false });
            } else this._setState({ isLoading: false });
        });
    }

    getProductViaId = () => {
        const { location: LocationRN } = this.props;
        const { state } = LocationRN;
        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();
        const { isLoading } = this.state;

        Socket.request(getProductViaId.emit, {
            id,
            accessToken,
            productId: state.productId,
            area: filterData.area && filterData.area.length ? filterData.area[1] : 500,
            coordinates: [location.latitude, location.longitude]
        });

        UserApi.getSocketResponseOnce(getProductViaId.on, (res) => {
            console.log("VIEW PRODUCT DATA ===> ", res.data);

            if (res && res.message === "Success") {
                this._setState({ productData: res.data && res.data.length ? res.data[0] : {}, isLoading: false })
            } else this._setState({ isLoading: false, productData: {} });
        });
    }

    componentDidMount = () => {
        this.getMarkedAsViewedProductResponse();
    }

    onBack = () => {
        const { history, location } = this.props;

        if (location.state && location.state.screenType === "home")
            history.replace(routerNames.index, { selectedIndex: 0 })
        else history.go(-1);
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, floatBtn, icon } = styles;
        const { item, productData, isLoading } = this.state;
        const back = require('../../images/back.png');
        const similarProducts = productData && productData.user && productData.user.length ?
            productData.user.map(ele => ele.items) : [];

        // const { images } = item;
        const images = [
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg',
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg',
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg',
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg',
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg'
        ];

        if (isLoading)
            return (
                <WView dial={5} flex style={stretch}>
                    <WView dial={5}>
                        <WSpinner color={Palette.theme_color} />
                        <WText color={Palette.theme_color} padding={[5, 0]} fontFamily="Muli-Bold">Please wait...</WText>
                    </WView>
                </WView >
            );

        return (
            <WView dial={2} flex style={stretch}>
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start', paddingBottom: BOTTOM_STATUS_BAR }, stretch]}>
                    {
                        productData && productData.images && productData.images.length ?
                            <ImageSlider
                                {...this.props}
                                data={productData.images} />
                            : null
                    }
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        <WView flex dial={2} style={[stretch]}>
                            <HeadingDetail
                                item={productData} />
                            <OtherInfo
                                item={productData} />
                            <ShareAndCommentBar />
                            <ProductUserData
                                item={productData} />
                            {
                                similarProducts && similarProducts.length ?
                                    <RecentProductsList
                                        {...this.props}
                                        data={similarProducts}
                                        isViewMore={false}
                                        heading={"Similar Products"} /> : null
                            }
                        </WView>
                    </WView>
                </ScrollView>

                <WTouchable onPress={this.onBack.bind(this)} dial={5} style={floatBtn}>
                    <Image source={back} style={icon} />
                </WTouchable>
                <BottomBar
                    leftBtnLabel={"Add to Wish List"}
                    rightBtnLabel={"Rate Us"}
                />
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
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: 50,
        height: 50,
        borderRadius: 25
    }
}
