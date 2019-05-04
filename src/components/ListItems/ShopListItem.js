import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image, Linking, Alert } from 'react-native';
import { WText, WView, WRow, WSpinner, WTouchable, Image as WImage } from '../common';
import { RecentProductsItem } from '../ListItems/';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';

const CARD_IMAGE_WIDTH = 150;

export default class ShopListItem extends PureComponent {

    static propTypes = {
        heading: PropTypes.string,
        data: PropTypes.any,
        isLoading: PropTypes.bool,
        isViewMore: PropTypes.bool,
        onItemPress: PropTypes.func,
        marginContainer: PropTypes.array
    }

    static defaultProps = {
        isViewMore: true,
        marginContainer: [5, 5, 5, 0]
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }

    Btn = ({ path, onPress }) =>
        <WTouchable margin={[5, 10]} onPress={onPress} dial={5} style={styles.btnContainer1}>
            <Image source={path} style={[styles.iconStyle, { tintColor: Palette.white }]} />
        </WTouchable>

    dialNumber = (data) => {
        if (data && data.mobile_number) {
            Linking.openURL(`tel:+91${data.mobile_number}`);
        } else Alert.alert("", "Number not Found");
    }

    openScreen = (data) => {
        const { history } = this.props;

        history.push(routerNames.chat_room, {
            receiverId: data._id,
            image: data && data.imageUrl ? { uri: data.imageUrl } : require("../../images/profile.png")
        });
    }

    openScreen1 = (path, value = {}) => {
        const { history } = this.props;

        history.push(path, value);
    }

    render = () => {
        const { heading, data, isLoading, isViewMore, onPress, userId, onItemPress, marginContainer } = this.props;
        const { container, getBtnContainer, stretch, iconStyle, imageStyle } = styles;

        const message = require('../../images/message.png');
        const phone = require('../../images/phone.png');
        const share = require('../../images/share1.png');
        const shop = require("../../images/shop.png");
        const view = require("../../images/show_password.png");

        return (
            <WTouchable onPress={onItemPress ? onItemPress.bind(this, data._id) : this.openScreen1.bind(this, routerNames.viewPortal, { screenType: "home", userId: data._id })} dial={4} margin={marginContainer} style={[stretch, container]}>
                <WView>
                    <Image source={data && data.imageUrl ? { uri: data.imageUrl } : shop} style={imageStyle} resizeMode={data && data.imageUrl ? "cover" : "center"} />
                    <WText fontSize={14} fontFamily={"Muli-Bold"} lines={1}>{data && data.business_name}</WText>
                    <WText fontSize={14} lines={2}>{data && data.business_address}</WText>
                </WView>
                <WRow dial={4}>
                    <WRow dial={4} flex>
                        <WText margin={[0, 5, 0, 0]}>{data && data.views ? data.views : 0}</WText>
                        <Image source={view} style={iconStyle} />
                    </WRow>
                    <WTouchable onPress={onItemPress ? onItemPress.bind(this, data._id) : this.openScreen1.bind(this, routerNames.viewPortal, { screenType: "home", userId: data._id })}  margin={[0, 0, 0, 10]} dial={5} style={getBtnContainer}>
                        <WText color={Palette.theme_color} fontFamily={"Muli-Bold"}>GET</WText>
                    </WTouchable>
                </WRow>
            </WTouchable>
        )
    }
}

const styles = {
    container: {
        width: CARD_IMAGE_WIDTH
    },
    stretch: {
        alignItems: 'stretch'
    },
    imageStyle: {
        width: 150,
        height: 200,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Palette.line_color,
    },
    btnContainer: {
        backgroundColor: Palette.theme_color,
        height: 30,
        borderRadius: 5
    },
    btnContainer1: {
        backgroundColor: Palette.theme_color,
        width: 20,
        height: 20,
        borderRadius: 10
    },
    iconStyle: {
        width: 10,
        height: 10
    },
    getBtnContainer: {
        width: 80,
        height: 20,
        borderRadius: 10,
        backgroundColor: Palette.line_color
    }
}