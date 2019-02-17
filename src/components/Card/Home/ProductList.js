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
import { get_home_items } from '../../../api/SocketUrls';
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
            data: []
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
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, icon, floatBtn } = styles;
        const { userType } = User.getUserData();
        const { isHomeFilterVisible, isLocationModalVisible, data, isLoading, isRefreshingList, isGetNewItems } = this.state;
        const plus = require('../../../images/plus.png');
        const empty = [];

        console.log("home loading render product list");

        return (
            <WView dial={2} padding={[5, 0]} style={[{ width: screenWidth, height: screenHeightWithHeader - 56 }, stretch]} >
                {

                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyExtractor={(item, index) => `products-${index}-${new Date().getTime()}`}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshingList}
                                onRefresh={this.onProductListRefresh.bind(this)}
                            />
                        }
                        onEndReachedThreshold={0.5}
                        ListHeaderComponent={
                            <WView dial={5}>
                                <ImageSlider
                                    imagePress={false}
                                    {...this.props}
                                    data={[
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCsmPy6oq2HWmSuWaORkefo5EwzJnf15c6sr1hUWVVOVsHzuYWBA",
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbEwxHfbUpWO9wquZbOkckybDUj_xhXHmLjIl1qeIRs4LMvSBN",
                                        "https://www.printastic.com/data/image_box/group/35/sales-and-promotions-banners.png",
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnNwyDJlqMr4zm6eoAG1Ed2C6OamntQQXYb__baxAYNcgzT7pFiw"
                                    ]} />
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
                    />
                }
            </WView>);
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

// onEndReachedThreshold = { 0.5}
// isLoading = { this.isRequestMoreProducts(index) }
