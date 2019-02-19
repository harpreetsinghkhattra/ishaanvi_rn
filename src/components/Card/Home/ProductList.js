import React, { PureComponent } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner } from '../../common';
import { ScrollView, PixelRatio, Image, FlatList, RefreshControl } from 'react-native';
import Palette from '../../../Palette';
import { Large } from '../../UI/btn';
import { routerNames } from '../../../RouteConfig';
import { RecentProductsList } from '../../Lists';
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

        console.log("const { _id: id, userAccessToken: accessToken ===> ", {
            id,
            accessToken,
            category: filterData && filterData.category && filterData.category.length ? filterData.category : "all",
            area: filterData && filterData.area && filterData.area.length ? filterData.area[1] : 500,
            coordinates: [location.latitude, location.longitude]
        });

        this.setState({ isLoading: true });
        Socket.request(get_home_items.emit, {
            id,
            accessToken,
            category: filterData && filterData.category && filterData.category.length ? filterData.category : "all",
            area: filterData && filterData.area && filterData.area.length ? filterData.area[1] : 500,
            coordinates: [location.latitude, location.longitude]
        });
        UserApi.getSocketResponseOnce(get_home_items.on, (res) => {
            if (res && res.message === "Success") {
                console.log("VIEW PRODUCT home DATA ========> ", res);

                this.shopIds = res.data && res.data.length ? Array.from(res.data.map(ele => ele._id)) : [];
                this.setState({ isLoading: false, isRefreshingList: false, data: res.data });
            } else this.setState({ isLoading: false, isRefreshingList: false });
        });


        this.isFetchedWholeData = false;
    }

    onBottomPullSocketResponse() {
        // alert(JSON.stringify(this.shopIds));
        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();
        Socket.request(get_home_items.emit, {
            id,
            accessToken,
            category: filterData && filterData.category && filterData.category.length ? filterData.category : "all",
            area: filterData && filterData.area && filterData.area.length ? filterData.area[1] : 500,
            coordinates: [location.latitude, location.longitude],
            presentShops: this.shopIds
        });
        UserApi.getSocketResponseOnce(get_home_items.on, (res) => {
            if (res && res.message === "Success") {

                this.isRequestMoreProducts1 = false;
                if (res && res.data && (!res.data.length || res.data.length <= 5)) {
                    this.isFetchedWholeData = true;
                }

                this.setState(prevState => {
                    const { data } = prevState;
                    let tempData = Array.from(data);
                    tempData = tempData.concat(Array.from(res.data));
                    this.shopIds = Array.from(tempData.map(ele => ele._id));

                    return ({ isLoading: false, isRequestMoreProducts: false, isRefreshingList: false, data: tempData });
                });
            } else this.setState({ isLoading: false, isRefreshingList: false, isRequestMoreProducts: false });
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

    render() {
        const { screenWidth, screenHeightWithHeader, history, openSearch } = this.props;
        const { stretch, btnStyle, btnContainer, border, icon, floatBtn, shopBtnContainer } = styles;
        const { userType } = User.getUserData();
        const { isHomeFilterVisible, isLocationModalVisible, data, isLoading, isRefreshingList, isGetNewItems, images } = this.state;
        const plus = require('../../../images/plus.png');
        const empty = [];

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
                        <ImageSlider
                            imagePress={false}
                            autoPlayEnable
                            {...this.props}
                            data={images} />
                        <WTouchable onPress={openSearch} flex style={[shopBtnContainer, { alignSelf: 'stretch' }]} margin={[10, 10]} padding={[0, 10]} dial={5}>
                            <WText color={Palette.white}>Search Shops Locally</WText>
                        </WTouchable>
                        {
                            isLoading ?
                                <WView dial={5} flex>
                                    <WSpinner size={"small"} color={Palette.theme_color} />
                                    <WText fontSize={16} fontFamily={"Muli-Bold"}>Looking for shops...</WText>
                                </WView>
                                : data && data.length ?
                                    null :
                                    <WView dial={5}>
                                        <WText fontSize={16} fontFamily={"Muli-Bold"}>No product found</WText>
                                        <Image source={require('../../../images/no_product.png')} resizeMode="cover" style={{ height: 200 }} />
                                    </WView>
                        }
                    </WView>
                }
                onEndReached={this.onRequestMoreProducts.bind(this)}
                data={data}
                renderItem={({ item, index }) =>
                    <ShopListItem
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
    },
    shopBtnContainer: {
        backgroundColor: Palette.theme_color,
        height: 40,
        borderRadius: 20
    }
}

// onEndReachedThreshold = { 0.5}
// isLoading = { this.isRequestMoreProducts(index) }
