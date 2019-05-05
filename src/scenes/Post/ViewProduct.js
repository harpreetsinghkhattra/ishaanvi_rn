import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable } from '../../components/common';
import { ScrollView, PixelRatio, Image, Platform, PermissionsAndroid, Linking, Share } from 'react-native';
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
import { Rating } from '../../scenes/Modal';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 70;

export default class ViewProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: {},
            isLoading: true,
            productData: {},
            isRatingModalVisible: false
        }

        this._isMounted = true;
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
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

        // alert(`${state.productId}`);
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
        else if (location.state && location.state.screenType === "search")
            history.replace(routerNames.index, { selectedIndex: 1, selectedSearchPageIndex: 1 })
        else history.go(-1);
    }

    /** Set visible */
    setRatingModalVisible = (isRatingModalVisible) => {
        this.ratingModalRef.init();
        this._setState({ isRatingModalVisible });
        this.getProductViaId();
    }

    onShare = async (id) => {
        try {
            const result = await Share.share({
                message:
                    `http://ishaanvi.co/share/product/${id}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared 
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, floatBtn, icon, userPortalFloatBtn, directionFloatBtn } = styles;
        const { item, productData, isLoading, isRatingModalVisible } = this.state;
        console.log("VIEW PRODUCT DATA ========> ", productData);
        const back = require('../../images/back.png');
        const directionIcon = require('../../images/location_direction.png');
        const userPortalIcon = require('../../images/userPortal.png');
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
                <Rating
                    {...this.props}
                    ref={ref => this.ratingModalRef = ref}
                    isVisible={isRatingModalVisible}
                    data={{
                        id: productData._id,
                        name: productData.name,
                        image: productData && productData.images && productData.images.length ? productData.images[0] : ""
                    }}
                    setVisible={this.setRatingModalVisible.bind(this, false)}
                />
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
                            {
                                productData && productData.userInfo ?
                                    <ShareAndCommentBar
                                        onSharePress={this.onShare.bind(this, productData._id)}
                                        onCommentPress={this.openScreen.bind(this, routerNames.comments, { productId: productData._id })}
                                        onChatPress={this.openScreen.bind(this, routerNames.chat_room, {
                                            receiverId: productData.userInfo._id,
                                            image: productData.userInfo && productData.userInfo.imageUrl ? { uri: productData.userInfo.imageUrl } : require("../../images/profile.png")
                                        })}
                                    /> : null
                            }
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
                    {...this.props}
                    leftBtnLabel={"ADD TO WISHLIST"}
                    centerBtnLabel={"CHAT & BUY"}
                    rightBtnLabel={"Rate Us"}
                    item={productData}
                    centerBtnPress={this.openScreen.bind(this, routerNames.chat_room, {
                        receiverId: productData.userInfo._id,
                        image: productData.userInfo && productData.userInfo.imageUrl ? { uri: productData.userInfo.imageUrl } : require("../../images/profile.png")
                    })}
                    rightBtnPress={this.setRatingModalVisible.bind(this, true)}
                />
                <WTouchable onPress={() => Linking.openURL(`google.navigation:q=${productData.userInfo.location.lat},${productData.userInfo.location.lng}`)} dial={5} style={directionFloatBtn}>
                    <Image source={directionIcon} style={icon} />
                </WTouchable>
                <WTouchable onPress={this.openScreen.bind(this, routerNames.viewPortal, { userId: productData.userId })} dial={5} style={userPortalFloatBtn}>
                    <Image source={userPortalIcon} style={icon} />
                </WTouchable>
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
    },
    userPortalFloatBtn: {
        position: 'absolute',
        right: 10,
        bottom: 70,
        backgroundColor: Palette.theme_color,
        width: 50,
        height: 50,
        borderRadius: 25,
        elevation: 2
    },
    directionFloatBtn: {
        position: 'absolute',
        right: 10,
        bottom: 125,
        backgroundColor: Palette.theme_color,
        width: 50,
        height: 50,
        borderRadius: 25,
        elevation: 2
    }
}
