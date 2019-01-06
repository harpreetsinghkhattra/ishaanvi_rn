import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, ScrollView, Image } from 'react-native';
import { ProductListItem } from '.';
import { WView, WSpinner, WText } from '../../common';
import Palette from '../../../Palette';
import { userPortalProducts } from '../../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../../api';
import { User } from '../../../model/user';

export default class ProductList extends PureComponent {

    static propTypes = {
        type: PropTypes.string,
        onNewProductsResponse: PropTypes.func,
        onSaleProductsResponse: PropTypes.func
    }

    constructor(props) {
        super(props);
        this._isMounted = true;
    }

    _setState = (value, cb) => {
        if (!this._isMounted) return;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { screenWidth, data, isLoading, type } = this.props;
        const column = 2;
        const width = screenWidth / column;

        if (data && data.length)
            data = data.map(ele => ele.product ? ele.product : ele)

        if (isLoading)
            return (
                <WView dial={5} flex>
                    <WSpinner size={"small"} color={Palette.theme_color} />
                    <WText color={Palette.theme_color} fontFamily={"Muli-Bold"}>Please wait...</WText>
                </WView>
            );

        if (data && !data.length) {
            return (
                <WView dial={5}>
                    <WText fontSize={16} fontFamily={"Muli-Bold"}>No product found</WText>
                    <Image source={require('../../../images/no_product.png')} resizeMode="cover" style={{ height: 200 }} />
                </WView>
            );
        }

        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, flexDirection: 'row' }}
            >
                <WView dial={2} style={{ width }}>
                    {
                        data.map((item, index) => {
                            if (index % 2 === 0)
                                return (<WView key={`product-searched-item-even-${index}`}>
                                    <ProductListItem {...this.props} width={width} data={item} />
                                </WView>);
                        })
                    }
                </WView>
                <WView dial={2} style={{ width }}>
                    {
                        data.map((item, index) => {
                            if (index % 2 !== 0)
                                return (<WView key={`product-searched-item-odd-${index}`}>
                                    <ProductListItem {...this.props} width={width} data={item} />
                                </WView>);
                        })
                    }
                </WView>
            </ScrollView>
        )
    }
}
