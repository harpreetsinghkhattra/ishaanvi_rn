import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, ScrollView, Image } from 'react-native';
import { ProductCardsListItem } from '.';
import { WView, WSpinner, WText } from '../../common';
import Palette from '../../../Palette';
import { userPortalProducts } from '../../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../../api';
import { User } from '../../../model/user';
import { ShopListItem } from '../../../components/ListItems'
import { routerNames } from '../../../RouteConfig';

const PAGE_INDEX = 1;
export default class ShopList extends PureComponent {

    static propTypes = {
        type: PropTypes.string,
        onNewProductsResponse: PropTypes.func,
        onSaleProductsResponse: PropTypes.func,
        onItemPress: PropTypes.func
    }

    constructor(props) {
        super(props);

        const { initialSearchTabPage, data } = this.props;

        this.limit = 15;
        this.state = {
            isLazyLoading: initialSearchTabPage === PAGE_INDEX ? true : false,
            data: Array.from(data && data.users ? data.users : []).slice(0, this.limit)
        }

        this._isMounted = true;

        this.listenLazyLoadEvent();
    }

    listenLazyLoadEvent = () => {
        const { tabEmitter, isFilter } = this.props;
        if (tabEmitter.addListener) {
            tabEmitter.addListener('search_lazy_load', (data) => {
                if (isFilter) isFilter && isFilter(data && data.index === PAGE_INDEX ? false : true);
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
        tabEmitter.removeAllListeners();
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }

    onEndReached = () => {
        const { data } = this.props;

        if (this.isOnEndReached) {
            this.limit += 15;
            this._setState({ data: Array.from(data && data.length ? data[0].users : []).slice(0, this.limit) });
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
            data && data.length && prevProps.data && prevProps.data.length && data[0].users.length !== prevProps.data[0].users.length ||
            data && data.length && data[0].users.length && prevProps.data && prevProps.data.length && prevProps.data[0].users.length && prevProps.data[0].users[0]._id !== data[0].users[0]._id
        ) {

            this.limit = 15;
            this.isOnEndReached = true;
            this._setState({
                data: Array.from(data && data.length ? data[0].users : []).slice(0, this.limit)
            });
            if (this.limit > data.length) {
                this.isOnEndReached = false;
            }

            console.log("this.isOnEndReached", this.isOnEndReached);
        }
    }

    render() {

        const empty = [];

        const { isLazyLoading } = this.state;
        if (!isLazyLoading) return empty;

        const { screenWidth, isLoading, type, isEmpty } = this.props;
        let { ...rest } = this.props;
        const { data } = this.state;
        const column = 2;
        const width = screenWidth / column;

        return (
            <FlatList
                data={data}
                style={{ flexGrow: 1 }}
                onEndReached={this.onEndReached.bind(this)}
                onEndReachedThreshold={1}
                numColumns={2}
                ListHeaderComponent={
                    data && !data.length && isEmpty ?
                        <WView dial={2} flex margin={[30, 0]}>
                            <WText color={Palette.black}>No Result Found</WText>
                        </WView> :
                        data && !data.length ?
                            <WView dial={5} flex margin={[30, 0]}>
                                <Image source={require('../../../images/searchshops.png')} style={{ width: 150, height: 150, tintColor: Palette.theme_color }} />
                                <WText color={Palette.black}>Search for shops</WText>
                            </WView> : null
                }
                keyExtractor={(item, index) => `shops-product-${index}`}
                renderItem={({ item, index }) => <ShopListItem
                    {...rest}
                    data={item}
                    marginContainer={[5, 5]}
                    onItemPress={userId => this.openScreen(routerNames.viewPortal, { screenType: 'search', userId })}
                />}
            />
        )
    }
}


