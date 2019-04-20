import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, ScrollView, Image } from 'react-native';
import { ProductCardsListItem } from '.';
import { WView, WSpinner, WText } from '../../common';
import Palette from '../../../Palette';
import { userPortalProducts } from '../../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../../api';
import { User } from '../../../model/user';
import { routerNames } from '../../../RouteConfig';

const PAGE_INDEX = 0;
export default class ProductList extends PureComponent {

    static propTypes = {
        type: PropTypes.string,
        onNewProductsResponse: PropTypes.func,
        onSaleProductsResponse: PropTypes.func,
        onItemPress: PropTypes.func
    }

    static defaultProps = {
        initialSearchTabPage: 1,
        isSearch: false
    }

    constructor(props) {
        super(props);

        const { initialSearchTabPage, data } = this.props;

        this.limit = 15;
        this.state = {
            isLazyLoading: initialSearchTabPage === PAGE_INDEX ? true : false,
            data: Array.from(data.map(ele => ele.product ? ele.product : ele)).slice(0, this.limit)
        }

        this._isMounted = true;
        this.isOnEndReached = true;

        this.listenLazyLoadEvent();
    }

    listenLazyLoadEvent = () => {
        const { tabEmitter } = this.props;
        if (tabEmitter && tabEmitter.addListener) {
            tabEmitter.addListener('search_lazy_load', (data) => {
                if (data && data.index === PAGE_INDEX)
                    this.setState(prevState => {
                        if (!prevState.isLazyLoading) {
                            // this.init()
                            return { isLazyLoading: true };
                        }
                    });
            });
        }
    }

    _setState = (value, cb) => {
        if (!this._isMounted) return;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    componentWillUnmount() {
        const { tabEmitter } = this.props;

        this._isMounted = false;
        tabEmitter && tabEmitter.removeAllListeners();
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }

    onEndReached = () => {
        const { data } = this.props;

        if (this.isOnEndReached) {
            this.limit += 15;
            this._setState({ data: Array.from(data.map(ele => ele.product ? ele.product : ele)).slice(0, this.limit) });
            if (this.limit > data.length) {
                this.isOnEndReached = false;
            }

            console.log("this.isOnEndReached", this.isOnEndReached);
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { data } = this.props;
        if (
            data && prevProps.data && prevProps.data.length !== data.length ||
            data && prevProps.data && prevProps.data.length && data.length &&
            prevProps.data[0]._id !== data[0]._id ||
            data && prevProps.data && prevProps.data.length && prevProps.data[0].product && data.length && prevProps.data[0].product.length && prevProps.data[0].product[0]._id !== data[0].product[0]._id
        ) {
            this.limit = 15;
            this.isOnEndReached = true;
            this._setState({
                data: Array.from(data.map(ele => ele.product ? ele.product : ele)).slice(0, this.limit)
            });
            if (this.limit > data.length) {
                this.isOnEndReached = false;
            }
        }
    }


    render() {

        const empty = [];

        const { isLazyLoading } = this.state;
        if (!isLazyLoading) return empty;

        let { screenWidth, isLoading, type, isSearch } = this.props;
        const { data } = this.state;
        const column = 2;
        const width = screenWidth / column;

        if (isLoading)
            return (
                <WView dial={5} flex>
                    <WSpinner size={"small"} color={Palette.theme_color} />
                    <WText color={Palette.theme_color} fontFamily={"Muli-Bold"}>Please wait...</WText>
                </WView>
            );

        return (
            <FlatList
                data={data}
                keyExtractor={(item, index) => `shops-product-${index}`}
                style={{ flexGrow: 1 }}
                numColumns={2}
                onEndReached={this.onEndReached.bind(this)}
                ListHeaderComponent={
                    data && !data.length && isSearch ?
                        <WView dial={5} flex margin={[30, 0]}>
                            <Image source={require('../../../images/searchproducts.png')} style={{ width: 150, height: 150, tintColor: Palette.theme_color }} />
                            <WText color={Palette.black}>Search for products</WText>
                        </WView> : data && !data.length ?
                            <WView dial={5} flex margin={[30, 0]}>
                                <Image source={require('../../../images/no_product.png')} resizeMode={"cover"} style={{ height: 200 }} />
                                <WText color={Palette.black}>No Product Available</WText>
                            </WView> : null
                }
                renderItem={({ item, index }) => <ProductCardsListItem
                    {...this.props}
                    item={item}
                    onItemPress={productId => this.openScreen(routerNames.view_product, isSearch ? { screenType: "search", productId } : { productId })}
                />}
            />
        )
    }
}



// <ScrollView
//                 contentContainerStyle={{ flexGrow: 1, flexDirection: 'row' }}
//             >
//                 <WView dial={2} style={{ width }}>
//                     {
//                         data.map((item, index) => {
//                             if (index % 2 === 0)
//                                 return (<WView key={`product-searched-item-even-${index}`}>
//                                     <ProductListItem {...this.props} width={width} data={item} />
//                                 </WView>);
//                         })
//                     }
//                 </WView>
//                 <WView dial={2} style={{ width }}>
//                     {
//                         data.map((item, index) => {
//                             if (index % 2 !== 0)
//                                 return (<WView key={`product-searched-item-odd-${index}`}>
//                                     <ProductListItem {...this.props} width={width} data={item} />
//                                 </WView>);
//                         })
//                     }
//                 </WView>
//             </ScrollView>