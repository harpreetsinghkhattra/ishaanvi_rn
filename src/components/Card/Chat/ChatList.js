import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image, StyleSheet } from 'react-native'
import { WRow, WView, WText, WTouchable } from '../../common'
import Palette from '../../../Palette'

export default class ChatList extends PureComponent {

    static propTypes = {

    }

    renderItem = (item, index) => {
        const { userImageStyle, productImageStyle, container } = styles;

        return (
            <WTouchable dial={5} style={container}>
                <WRow dial={5}>
                    <WView dial={5}>
                        <Image source={require('../../../images/no_product.png')} style={userImageStyle} resizeMode={"center"} />
                    </WView>
                    <WView dial={4} flex padding={[10, 10]}>
                        <WText fontFamily={"Muli-Bold"} fontSize={14}>Chris</WText>
                        <WText fontFamily={"Muli-Bold"}> is this still available</WText>
                    </WView>
                    <WView dial={5} >
                        <Image source={require('../../../images/no_product.png')} style={productImageStyle} resizeMode={"center"} />
                    </WView>
                </WRow>
            </WTouchable>
        )
    }

    render() {
        return (
            <FlatList
                keyExtractor={(item, index) => `chat-list-${index}`}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                style={{ flexGrow: 1, marginBottom: 60 }}
                renderItem={this.renderItem.bind(this)}
            />
        )
    }
}

const styles = {
    userImageStyle: { width: 80, height: 80, borderRadius: 40 },
    productImageStyle: { width: 80, height: 80, borderRadius: 4 },
    container: {
        alignItems: "stretch",
        borderColor: Palette.line_color,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid'
    }
}