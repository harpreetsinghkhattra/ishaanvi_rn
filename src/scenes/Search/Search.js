import React, { PureComponent } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner, Image } from '../../components/common';
import { ScrollView, PixelRatio, FlatList, RefreshControl } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { RecentProductsList } from '../../components/Lists';
import { SearchViaProduct } from '../../components/Header';
import { Storage, StorageKeys } from '../../helper';
import { User } from '../../model/user';
import { UserLocation } from '../../model/UserLocation';
import { MyLocation, HomeFilter } from '../Modal/';
import { get_home_items, search } from '../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../api';
import { ProductList as RandomProductList } from '../../components/Card/Home';
import { ProductList } from '../../components/Card/Search';
import { Search } from '../../model/search';
import { SearchTab, SearchAutoFill } from '.';

const UserData = new Storage();
const PAGE_INDEX = 1;

export default class Login extends PureComponent {

    constructor(props) {
        super(props);

        const { initialPage } = this.props;
        this.state = {
            isHomeFilterVisible: false,
            isLocationModalVisible: false,
            isLazyLoading: initialPage === PAGE_INDEX ? true : false,
            isLoading: true,
            data: [],
            isSearchLoading: false,
            isNoProduct: false,
            searchedElements: []
        }

        this.listenLazyLoadEvent();
        this._isMounted = true;
        this.searchTabIndex = 0;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _setState = (value, cb) => {
        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    componentDidMount = () => {
        const { initialPage } = this.props;

        if (Search.getSearchData().search) this.onSubmit(Search.getSearchData().search);
        // if (initialPage === PAGE_INDEX) this.init();
    }

    listenLazyLoadEvent = () => {
        const { tabEmitter } = this.props;
        if (tabEmitter.addListener) {
            tabEmitter.addListener('home_lazy_load', (data) => {
                if (data && data.index === PAGE_INDEX)
                    this._setState(prevState => {
                        if (!prevState.isLazyLoading) {
                            // this.init()
                            return { isLazyLoading: true };
                        }
                    });
            });
        }
    }

    init = () => {
        this.getUserResponse();
    }

    getUserResponse() {
        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();
        Socket.request(get_home_items.emit, {
            id,
            accessToken,
            category: filterData.category && filterData.category.length === 0 ? filterData.category : "all",
            area: filterData.area && filterData.area.length ? filterData.area[1] : 500,
            coordinates: [location.latitude, location.longitude]
        });
        UserApi.getSocketResponseOnce(get_home_items.on, (res) => {
            if (res && res.message === "Success") {
                this._setState({ isLoading: false, isRefreshingList: false, data: res.data });
            } else this._setState({ isLoading: false, isRefreshingList: false });
        });
    }

    onBottomPullSocketResponse() {
        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();
        Socket.request(get_home_items.emit, {
            id,
            accessToken,
            category: filterData.category && filterData.category.length ? filterData.category : "all",
            area: filterData.area && filterData.area.length ? filterData.area[1] : 500,
            coordinates: [location.latitude, location.longitude]
        });
        UserApi.getSocketResponseOnce(get_home_items.on, (res) => {
            if (res && res.message === "Success") {
                this._setState(prevState => {
                    const { data } = prevState;
                    let tempData = Array.from(data);
                    tempData = tempData.concat(Array.from(res.data));

                    return ({ isLoading: false, isRefreshingList: false, data: tempData });
                });
            } else this._setState({ isLoading: false, isRefreshingList: false });
        });
    }

    /** Set visible */
    setLocationModalVisible = (isLocationModalVisible, location) => {
        if (location && typeof location === 'string') {
            this.onTextChange("userLocation", location);
            this.setState(() => ({ isVisible }), this.getLocationDetail.bind(this));
        } else this._setState({ isLocationModalVisible })
    }

    /** Set visible */
    setFilterModalVisible = (isHomeFilterVisible, refresh) => {
        if (refresh === "refresh") {
            this.onSubmit(this.searchViaProductInput.state.searchValue);
        }

        this._setState({ isHomeFilterVisible });
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }

    onProductListRefresh = () => {
        this._setState({ isRefreshingList: true });
        this.getUserResponse();
    }

    onRequestMoreProducts = () => {
        console.log("home loading render");
        this._setState({ isRequestMoreProducts: true });
        this.onBottomPullSocketResponse();
    }

    isRequestMoreProducts = (index) => {
        const { data, isRequestMoreProducts } = this.state;
        return (data.length - 1 === index && isRequestMoreProducts) ? true : false;
    }

    onSubmit = (searchValue, isOnTextChange = false) => {
        if (!searchValue) return;

        if (filterData && (filterData[0] > filterData[1])) return;

        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();

        const searchData = {
            id,
            accessToken,
            category: filterData.category && filterData.category.length ? filterData.category : "all",
            area: filterData.area && filterData.area.length ? filterData.area[1] : 500,
            price: filterData.price && filterData.price[1] ? [parseFloat(filterData.price[0]), parseFloat(filterData.price[1])] : 'all',
            searchValue,
            coordinates: [location.latitude, location.longitude]
        };

        console.log("searchDatasearchData", searchData, filterData);

        // "coordinates": [31.9579623, 75.6282207]

        if (!isOnTextChange) {
            this._setState(prevState => {
                if (prevState.isSearchLoading) return;
                return ({ isSearchLoading: true });
            });
        }

        Socket.request(search.emit, searchData);
        UserApi.getSocketResponseOnce(search.on, (res) => {
            console.log('get socket response once', JSON.stringify(searchData), JSON.stringify(res));
            if (!isOnTextChange) {
                if (res && res.message === "Success") {
                    this._setState({ isLoading: false, isRefreshingList: false, isSearchLoading: false, searchedElements: res.data, isNoProduct: true });
                } else this._setState({ isLoading: false, isRefreshingList: false, isSearchLoading: false, searchedElements: [], isNoProduct: true });
            } else {
                this.searchAutoFillRef && this.searchAutoFillRef.getData(res.data, this.searchTabIndex);
            }
        });
    }

    searchViaCategory = (category, isOnTextChange = false) => {

        if (category && category.length === 0) return;

        if (filterData && (filterData[0] > filterData[1])) return;

        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();

        const searchData = {
            id,
            accessToken,
            category,
            area: filterData.area && filterData.area.length ? filterData.area[1] : 500,
            price: filterData.price && filterData.price[1] ? [parseFloat(filterData.price[0]), parseFloat(filterData.price[1])] : 'all',
            searchValue: "",
            coordinates: [location.latitude, location.longitude]
        };

        console.log("searchDatasearchData", searchData, filterData);

        // "coordinates": [31.9579623, 75.6282207]

        if (!isOnTextChange) {
            this._setState(prevState => {
                if (prevState.isSearchLoading) return;
                return ({ isSearchLoading: true });
            });
        }

        Socket.request(search.emit, searchData);
        UserApi.getSocketResponseOnce(search.on, (res) => {
            console.log('get socket response once', JSON.stringify(searchData), JSON.stringify(res));
            if (!isOnTextChange) {
                if (res && res.message === "Success") {
                    this._setState({ isLoading: false, isRefreshingList: false, isSearchLoading: false, searchedElements: res.data, isNoProduct: true });
                } else this._setState({ isLoading: false, isRefreshingList: false, isSearchLoading: false, searchedElements: [], isNoProduct: true });
            } else {
                this.searchAutoFillRef && this.searchAutoFillRef.getData(res.data, this.searchTabIndex);
            }
        });
    }

    setSearchTabIndex = (index) => {
        this.searchTabIndex = index > -1 ? index : 0;
    }

    onItemSelect = (searchValue) => {
        this.searchViaProductInput && this.searchViaProductInput.setSearchValue(searchValue);
        this.onSubmit(searchValue);
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, icon, floatBtn } = styles;
        const { userType } = User.getUserData();
        const { isNoProduct, isHomeFilterVisible, isLocationModalVisible, isLazyLoading, data, isLoading, isRefreshingList, isGetNewItems, searchedElements, isSearchLoading } = this.state;
        const plus = require('../../images/plus.png');
        const empty = [];

        if (!isLazyLoading) return empty;

        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <SearchViaProduct
                    ref={ref => this.searchViaProductInput = ref}
                    isLoading={isSearchLoading}
                    isAutoFillView={(value) => this.searchAutoFillRef && this.searchAutoFillRef.isView(value)}
                    openFilter={this.setFilterModalVisible.bind(this, true)}
                    onSubmit={(value, isOnTextChange) => this.onSubmit(value, isOnTextChange)}
                />
                <HomeFilter
                    {...this.props}
                    isPrice
                    isVisible={isHomeFilterVisible}
                    setVisible={this.setFilterModalVisible.bind(this)}
                />
                <WView
                    flex
                    dial={2}
                    style={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - 56, justifyContent: 'flex-start' }, stretch]}
                >
                    <SearchTab
                        data={searchedElements}
                        setSearchTabIndex={index => this.setSearchTabIndex(index)}
                        isFilter={isFilter => this.searchViaProductInput && this.searchViaProductInput.isFilter(isFilter)}
                        {...this.props} />
                    <SearchAutoFill
                        onItemSelect={this.onItemSelect.bind(this)}
                        ref={ref => this.searchAutoFillRef = ref}
                    />
                </WView>
            </WView >);
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



// {
//                         searchedElements && searchedElements.length ?
//                             <ProductList
//                                 {...this.props}
//                                 data={searchedElements}
//                                 onItemPress={productId => this.openScreen(routerNames.view_product, { screenType: 'search', productId })}
//                             />
//                             :
//                             isNoProduct ?
//                                 <WView dial={5} flex backgroundColor={Palette.white}>
//                                     <WText color={Palette.theme_color} fontSize={14} fontFamily={"Muli-Bold"}>No Product Found</WText>
//                                     <Image
//                                         source={require('../../images/no_product.png')}
//                                         containerStyle={{ width: screenWidth }}
//                                     />
//                                 </WView>
//                                 :

//                                 <WView dial={5} flex backgroundColor={Palette.white}>
//                                     <Image
//                                         source={require('../../images/search_view.png')}
//                                         containerStyle={{ width: screenWidth }}
//                                     />
//                                     {/*<Image
//                                     source={require('../../images/search.jpg')}
//                                     containerStyle={{ width: screenWidth }}
//                                 />*/}
//                                 </WView>
//                     }