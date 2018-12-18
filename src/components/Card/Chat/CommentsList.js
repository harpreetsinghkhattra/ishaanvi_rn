import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image } from 'react-native'
import Palette from '../../../Palette'
import { WRow, WView, WTouchable, WText } from '../../common'

export default class CommentsList extends PureComponent {

    static propTypes = {

    }

    renderItem = (item, index) => {
        const { userImage } = styles;

        return (
            <WRow dial={2} padding={[10, 5]}>
                <WView dial={2}>
                    <Image source={require('../../../images/no_product.png')} style={userImage} />
                </WView>
                <WView dial={1} flex>
                    <WRow dial={4} flex>
                        <WView dial={4} flex>
                            <WText color={Palette.theme_color} fontSize={15} fontFamily={'Muli-Bold'}>Elieen Steele</WText>
                        </WView>
                        <WView dial={6} flex>
                            <WText color={Palette.borderColor}>1 hours ago</WText>
                        </WView>
                    </WRow>
                    <WView dial={6}>
                        <WText lines={1000} color={Palette.theme_color} fontSize={14}>Many restaurants in Myeongoing specialize in pork cutlet!, Many restaurants in Myeongoing specialize in pork cutlet!, Many restaurants in Myeongoing specialize in pork cutlet!, Many restaurants in Myeongoing specialize in pork cutlet!</WText>
                    </WView>
                </WView>
            </WRow>
        );
    }

    render() {
        return (
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                keyExtractor={(item, index) => `comment-list-${index}`}
                renderItem={this.renderItem.bind(this)}
            />
        )
    }
}

const styles = {
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40
    }
}
