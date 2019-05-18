import React, { PureComponent } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner, WButton } from '../../common';
import { ScrollView, PixelRatio, Image, FlatList, RefreshControl } from 'react-native';
import Palette from '../../../Palette';
import { Large } from '../../UI/btn';
import { routerNames } from '../../../RouteConfig';
import { RecentProductsList, ShopList } from '../../Lists';
import { ShopListItem } from '../../ListItems';
import { SearchHeader } from '../../Header';
import { Storage, StorageKeys } from '../../../helper';
import { User } from '../../../model/user';
import { UserLocation } from '../../../model/UserLocation';
import { MyLocation, HomeFilter } from '../../../scenes/Modal';
import { get_home_items, getHomeBanners } from '../../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../../api';
import { ImageSlider } from '../../ViewPost';

const UserData = new Storage();
const PAGE_INDEX = 0;

export default class ProductList extends PureComponent {

    constructor(props) {
        super(props);

        const { initialPage } = this.props;
        this.state = {
            isHomeFilterVisible: false,
            isLocationModalVisible: false,
            isLoading: true,
            data: [],
            images: [
                "http:/13.127.188.164/public/uploadProductFiles/15504257574992701ishaanvi.jpeg",
                "http:/13.127.188.164/public/uploadProductFiles/15504257574992701ishaanvi.jpeg",
                "http:/13.127.188.164/public/uploadProductFiles/15504257574992701ishaanvi.jpeg",
                "http:/13.127.188.164/public/uploadProductFiles/15504257574992701ishaanvi.jpeg",
                "http:/13.127.188.164/public/uploadProductFiles/15504257574992701ishaanvi.jpeg",
                "http:/13.127.188.164/public/uploadProductFiles/15504257574992701ishaanvi.jpeg"
            ]
        }

        this.shopIds = [];
        this.isFetchedWholeData = false;
        this.isRequestMoreProducts1 = false;
        this.homeData = [];
    }

    componentDidMount = () => {
        this.init();
    }

    init = () => {
        this.getUserResponse();
        this.getHomeBanners();
    }

    getHomeBanners() {
        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();

        Socket.request(getHomeBanners.emit, {
            id,
            accessToken
        });
        UserApi.getSocketResponseOnce(getHomeBanners.on, (res) => {
            if (res && res.message === "Success") {
                console.log("VIEW PRODUCT home DATA ========> ", res);

                this.setState({ images: res.data && res.data.length ? res.data.map(ele => ele.images) : [] });
            } else this.setState({ images: [] });
        });
    }

    getUserResponse() {
        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();

        console.log("user data ===> ", User.getUserData());
        this.setState({ isLoading: true });
        Socket.request(get_home_items.emit, {
            id,
            accessToken,
            area: 500,
            coordinates: [location.latitude, location.longitude]
        });
        UserApi.getSocketResponseOnce(get_home_items.on, (res) => {
            console.log("VIEW PRODUCT home DATA ========> home items", res);
            if (res && res.message === "Success") {
                this.shopIds = res.data && res.data.length ? Array.from(res.data.map(ele => ele._id)) : [];
                this.homeData = res.data;

                const tempData = res.data && res.data.length ? res.data && res.data.length && res.data[0] : [];
                if (tempData && tempData.recentViewedShops && tempData.recentViewedShops.length && (this.homeData.findIndex(ele => ele.category === "RECENT VISITED SHOPS") === -1)) {
                    this.homeData.push({
                        category: "RECENT VISITED SHOPS",
                        values: tempData.recentViewedShops.map(ele => ele.shopDetail).reverse().slice(0, 6)
                    })
                }

                if (tempData && tempData.recentViewedProducts && tempData.recentViewedProducts.length && (this.homeData.findIndex(ele => ele.category === "RECENT VISITED PRODUCTS") === -1)) {
                    this.homeData.push({
                        category: "RECENT VISITED PRODUCTS",
                        values: tempData.recentViewedProducts.map(ele => ele.productDetail).reverse().slice(0, 6)
                    })
                }
                this.setState({ isLoading: false, isRefreshingList: false, data: this.homeData.length ? Array.from(this.homeData) : [] });
            } else this.setState({ isLoading: false, isRefreshingList: false });
        });


        this.isFetchedWholeData = false;
    }

    onBottomPullSocketResponse() {

        if (!this.homeData.length) this.setState({ isLoading: false, isRefreshingList: false, isRequestMoreProducts: false });

        this.setState(prevState => {
            const { data } = prevState;
            let tempData = Array.from(data);

            tempData = tempData.concat(Array.from([this.homeData[tempData.length <= this.homeData.length ? tempData.length : this.homeData.length - 1]]));

            this.isRequestMoreProducts1 = false;
            if (tempData.length === this.homeData.length) {
                this.isFetchedWholeData = true;
            }

            return ({ isLoading: false, isRequestMoreProducts: false, isRefreshingList: false, data: tempData });
        });
    }

    /** Set visible */
    setLocationModalVisible = (isLocationModalVisible, location) => {
        if (location && typeof location === 'string') {
            this.onTextChange("userLocation", location);
            this.setState(() => ({ isVisible }), this.getLocationDetail.bind(this));
        } else this.setState({ isLocationModalVisible })
    }

    /** Set visible */
    setFilterModalVisible = (isHomeFilterVisible, refresh) => {
        if (refresh === "refresh") {
            this.init();
        }

        this.setState({ isHomeFilterVisible });
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }

    onProductListRefresh = () => {
        this.setState({ isRefreshingList: true });
        this.getUserResponse();
    }

    onRequestMoreProducts = (e) => {
        const { isRequestMoreProducts } = this.state;
        const { distanceFromEnd } = e;
        console.log("onrequest more products", distanceFromEnd);

        if (this.isFetchedWholeData) {
            return;
        }

        if (isRequestMoreProducts || this.isRequestMoreProducts1) return;
        if (this.shopIds.length === 0) return;

        if (distanceFromEnd >= 0) {
            // this.setState({ isRequestMoreProducts: true });
            this.isRequestMoreProducts1 = true;
            this.onBottomPullSocketResponse();
        }
    }

    isRequestMoreProducts = (index) => {
        const { data, isRequestMoreProducts } = this.state;
        return (data.length - 1 === index && isRequestMoreProducts) ? true : false;
    }

    /** Render Category Buttons */
    CategoryBtn = ({ label1, label2, backgroundColor1, backgroundColor2, onPress1, onPress2 }) =>
        <WRow dial={5} margin={[5, 5]}>
            {
                label1 ?
                    <WButton
                        flex
                        dial={5}
                        fontSize={14}
                        label={label1}
                        onPress={onPress1}
                        margin={label2 ? [0, 5, 0, 0] : [0, 0]}
                        btnPadding={[6, 10]}
                        textStyle={{ textAlign: 'center' }}
                        containerStyle={[styles.btnStyle, { backgroundColor: backgroundColor1 }]}
                    /> : null
            }
            {
                label2 ?
                    <WButton
                        flex
                        dial={5}
                        fontSize={14}
                        label={label2}
                        btnPadding={[6, 10]}
                        onPress={onPress2}
                        textStyle={{ textAlign: 'center' }}
                        containerStyle={[styles.btnStyle, { backgroundColor: backgroundColor2 }]}
                    /> : null
            }
        </WRow>

    render() {
        const { screenWidth, screenHeightWithHeader, history, openSearch } = this.props;
        const { userType } = User.getUserData();
        const { isHomeFilterVisible, isLocationModalVisible, data, isLoading, isRefreshingList, isGetNewItems } = this.state;
        const plus = require('../../../images/plus.png');
        const empty = [];
        const images = [
            require("../../../images/slider1.jpeg"),
            require("../../../images/slider2.jpeg"),
            require("../../../images/slider3.jpeg")
        ];

        console.log("home loading render product list");

        return (
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(item, index) => `products-${index}-${new Date().getTime()}`}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshingList}
                        onRefresh={this.onProductListRefresh.bind(this)}
                    />
                }
                ListHeaderComponent={
                    <WView dial={5}>
                        <this.CategoryBtn
                            label1={"MULTI BRAND"}
                            label2={"GARMENTS"}
                            onPress1={openSearch.bind(this, ['multi brand\'s'])}
                            onPress2={openSearch.bind(this, ['garments'])}
                            backgroundColor1={Palette.greenBtn1}
                            backgroundColor2={Palette.greenBtn2} />
                        <this.CategoryBtn
                            label1={"BOUTIQUES"}
                            label2={"DESIGNER"}
                            onPress1={openSearch.bind(this, ['boutiques'])}
                            onPress2={openSearch.bind(this, ['designers \n(men, woman)'])}
                            backgroundColor1={Palette.red}
                            backgroundColor2={Palette.orange} />
                        <this.CategoryBtn
                            label1={"CLOTH HOUSE/SHOP"}
                            onPress1={openSearch.bind(this, ['Cloth \nHouse/Shop'])}
                            backgroundColor1={Palette.lightSeeGreen}
                        />
                        {
                            images && images.length ?
                                <ImageSlider
                                    imagePress={false}
                                    absolutePath
                                    minHeight={125}
                                    containerBackgroundColor={'transparent'}
                                    inActiveColor={Palette.line_color}
                                    autoPlayEnable
                                    {...this.props}
                                    data={images} /> : null}
                        {
                            isLoading ?
                                <WView dial={5} flex>
                                    <WSpinner size={"small"} color={Palette.theme_color} />
                                    <WText fontSize={16} fontFamily={"Muli-Bold"}>Looking for shops...</WText>
                                </WView>
                                : data && data.length ?
                                    null :
                                    <WView dial={5}>
                                        <WText fontSize={16} fontFamily={"Muli-Bold"}>No shop found</WText>
                                        <Image source={require('../../../images/no_product.png')} resizeMode="cover" style={{ height: 200 }} />
                                    </WView>
                        }
                    </WView>
                }
                data={data}
                renderItem={({ item, index }) =>
                    <ShopList
                        {...this.props}
                        data={item}
                    />}
            />);
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    },
    btnStyle: {
        borderColor: Palette.line_color,
        elevation: 2,
        borderRadius: 3
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
    },
    shopBtnContainer: {
        backgroundColor: Palette.theme_color,
        height: 40,
        borderRadius: 20
    }
}

// onEndReachedThreshold = { 0.5}
// isLoading = { this.isRequestMoreProducts(index) }
// onEndReached={this.onRequestMoreProducts.bind(this)}
