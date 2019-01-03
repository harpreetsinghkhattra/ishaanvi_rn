import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image, StyleSheet } from 'react-native'
import { WRow, WView, WText } from '../../common'
import Palette from '../../../Palette'

export default class NotificationsList extends PureComponent {

    static propTypes = {

    }

    /** Render item */
    renderItem = () => {
        const { container, iconStyle } = styles;

        return (
            <WRow dial={5} margin={[0, 5, 5, 5]} padding={[5, 0]} style={container}>
                <WView dial={5}>
                    <Image source={require('../../../images/no_product.png')} style={iconStyle} />
                </WView>
                <WView dial={4} flex>
                    <WText fontSize={14} lines={2} fontFamily={'Muli-Bold'}>Flex Formation Fitness & Family Fun uploaded: About my work 2016-2017 Where i teach bootcamps Behind the scenes</WText>
                    <WText fontFamily={'Muli-Bold'}>1 minute ago</WText>
                </WView>
            </WRow>
        );
    }

    render() {
        return (
            <FlatList
                keyExtractor={(item, index) => `notifications-${index}`}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                style={{ flexGrow: 1, marginBottom: 60 }}
                renderItem={this.renderItem} />
        )
    }
}

const styles = {
    container: {
        alignItems: 'stretch',
        alignSelf: 'stretch',
        borderColor: Palette.line_color,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid'
    },
    iconStyle: {
        width: 80,
        height: 80
    }
}
