import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image } from 'react-native'
import Palette from '../../../Palette'
import { WRow, WView, WTouchable, WText } from '../../common'
import moment from 'moment'

export default class ChatMessagesList extends PureComponent {

    static propTypes = {
        loading: PropTypes.bool, 
        items: PropTypes.array,
        getCommentListRef: PropTypes.func
    }

    renderItem = (item, index) => {
        return this.renderSenderItem(item, index);
    }

    renderReceiverItem = (item, index) => {
        const { userImage, messageContainer } = styles;
        // const { message, userInfo, createdTime } = item.item;

        // console.log("COMMENTS PRODUCT DATA ===> COMMENT LIST", item);

        return (
            <WRow dial={1} padding={[10, 5]}>
                <WView dial={2}>
                    <Image source={require('../../../images/profile.png')} style={userImage} />
                </WView>
                <WView dial={4} flex={0.8}>
                    <WView dial={4} padding={[10, 10]} margin={[5, 5]} flex style={[messageContainer]} backgroundColor={Palette.line_color}>
                        <WText color={Palette.black} lines={100000} fontSize={14}>Test message to check data here, Test message to check data here, Test message to check data here</WText>
                    </WView>
                    <WView dial={6}>
                        <WText lines={1000} color={Palette.border_color} right>10:00 AM</WText>
                    </WView>
                </WView>
            </WRow>
        );
    }

    renderSenderItem = (item, index) => {
        const { userImage, messageContainerRight } = styles;
        // const { message, userInfo, createdTime } = item.item;

        // console.log("COMMENTS PRODUCT DATA ===> COMMENT LIST", item);

        return (
            <WRow dial={3} padding={[10, 5]}>
                <WView dial={6} flex={0.7}>
                    <WView dial={4} padding={[10, 10]} margin={[5, 5]} flex style={[messageContainerRight]} backgroundColor={Palette.theme_color}>
                        <WText color={Palette.white} lines={100000} fontSize={14}>Test</WText>
                    </WView>
                    <WView dial={6} padding={[0, 10]} margin={[0, 5]}>
                        <WText lines={1000} color={Palette.border_color} right>10:00 AM</WText>
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

        // if (!items || (items && !items.length))
        //     return (
        //         <WView dial={5} flex>
        //             <WText color={Palette.theme_color} center>Please Write your Comment Below.</WText>
        //         </WView>
        //     );

        return (
            <FlatList
                data={[1, 2, 3 , 4, 5]}
                ref={getCommentListRef}
                style={{ flex: 1 }}
                inverted={-1}
                keyExtractor={(item, index) => `comment-list-${index}`}
                renderItem={this.renderItem.bind(this)}
            />
        )
    }
}

const styles = {
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    messageContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    messageContainerRight: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    }
}
