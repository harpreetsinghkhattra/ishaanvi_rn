import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, ScrollView } from 'react-native';
import { ProductListItem } from '.';
import { WView } from '../../common';

export default class ProductList extends PureComponent {

    render() {
        let { screenWidth, data } = this.props;
        const column = 2;
        const width = screenWidth / column;
        data = data.map(ele => ele.product) 

        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, flexDirection: 'row' }}
            >
                <WView dial={2} style={{ width }}>
                    {
                        data.map((item, index) => {
                            if (index%2 === 0)
                                return (<WView>
                                    <ProductListItem key={`product-searched-item-even-${index}`} width={width} data={item} />
                                </WView>);
                        })
                    }
                </WView>
                <WView dial={2} style={{ width }}>
                    {
                        data.map((item, index) => {
                            if (index%2 !== 0)
                                return (<WView>
                                    <ProductListItem key={`product-searched-item-odd-${index}`} width={width} data={item} />
                                </WView>);
                        })
                    }
                </WView>
            </ScrollView>
        )
    }
}
