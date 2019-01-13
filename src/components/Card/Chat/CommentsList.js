import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image } from 'react-native'
import Palette from '../../../Palette'
import { WRow, WView, WTouchable, WText } from '../../common'
import moment from 'moment'

export default class CommentsList extends PureComponent {

    static propTypes = {
        loading: PropTypes.bool,
        items: PropTypes.array,
        getCommentListRef: PropTypes.func
    }

    renderItem = (item, index) => {
        const { userImage } = styles;
        const { message, userInfo, createdTime } = item.item;

        console.log("COMMENTS PRODUCT DATA ===> COMMENT LIST", item);

        return (
            <WRow dial={2} padding={[10, 5]}>
                <WView dial={2}>
                    <Image source={userInfo && userInfo.imageUrl ? { uri: userInfo.imageUrl } : require('../../../images/profile.png')} style={userImage} />
                </WView>
                <WView dial={1} flex>
                    <WRow dial={4} flex>
                        <WView dial={4} flex>
                            <WText color={Palette.theme_color} fontSize={15} fontFamily={'Muli-Bold'}>{userInfo ? userInfo.name : ''}</WText>
                        </WView>
                        <WView dial={6} flex>
                            <WText color={Palette.borderColor}>{moment(createdTime).fromNow()}</WText>
                        </WView>
                    </WRow>
                    <WView dial={6}>
                        <WText lines={1000} color={Palette.theme_color} fontSize={14}>{message}</WText>
                    </WView>
                </WView>
            </WRow>
        );
    }

    render() {
        const { loading, items, getCommentListRef } = this.props

        if (loading)
            return (
                <WView dial={5} flex>
                    <WSpinner size={"small"} color={Palette.theme_color} />
                    <WText color={Palette.theme_color} center>Please wait...</WText>
                </WView>
            );

        if (!items || (items && !items.length))
            return (
                <WView dial={5} flex>
                    <WText color={Palette.theme_color} center>Please Write your Comment Below.</WText>
                </WView>
            );

        return (
            <FlatList
                data={items.reverse()}
                ref={getCommentListRef}
                style={{flex:1}}
                inverted={-1}
                keyExtractor={(item, index) => `comment-list-${index}`}
                renderItem={this.renderItem.bind(this)}
            />
        )
    }
}

const styles = {
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 40
    }
}
