import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image, Linking, Alert } from 'react-native';
import { WText, WView, WRow, WSpinner, WTouchable } from '../common';
import { RecentProductsItem } from '../ListItems/';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';

export default class RecentProductsList extends PureComponent {

    static propTypes = {
        heading: PropTypes.string,
        data: PropTypes.any,
        isLoading: PropTypes.bool,
        isViewMore: PropTypes.bool,
        onItemPress: PropTypes.func
    }

    static defaultProps = {
        isViewMore: true
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

    openScreen1 = (path, value={}) => {
        const { history } = this.props;

        history.push(path, value);
    }

    render = () => {
        const { heading, data, isLoading, isViewMore, onPress, userId, onItemPress } = this.props;
        const { btnContainer, stretch, imageStyle, iconStyle, container } = styles;

        const message = require('../../images/message.png');
        const phone = require('../../images/phone.png');
        const share = require('../../images/share1.png');

        const { name, business_name, mobile_number, business_address, imageUrl } = data;
        
        return (
            <WView dial={4} margin={[5, 5]} style={[stretch, container]}>
                <WRow dial={4} style={[stretch]}>
                    <WView dial={5} padding={[0, 5]}>
                        <Image source={imageUrl ? { uri: imageUrl } : require("../../images/profile.png")} style={imageStyle} />
                    </WView>
                    <WView flex dial={4} padding={[0, 5]}>
                        <WText color={Palette.black} fontFamily={"Muli-Bold"} fontSize={14}>{name}</WText>
                        <WText color={Palette.black} fontSize={14} >{business_name}</WText>
                        <WText color={Palette.black} fontSize={12} lines={2}>{business_address}</WText>
                    </WView>
                    <WView dial={2} padding={[5, 5]}>
                        <WTouchable onPress={onItemPress ? onItemPress.bind(this, data._id) : this.openScreen1.bind(this, routerNames.viewPortal, { screenType: "home", userId: data._id })} style={btnContainer} dial={5} padding={[0, 10]}> 
                            <WText center color={Palette.white} fontSize={14} fontFamily={"Muli-Bold"}>Visit</WText>
                        </WTouchable>
                    </WView>
                </WRow>
                <WRow dial={4} backgroundColor={Palette.line_color}>
                    <this.Btn
                        onPress={this.dialNumber.bind(this, data)}
                        path={phone} />
                    <this.Btn
                        onPress={this.openScreen.bind(this, data)}
                        path={message} />
                    <this.Btn
                        onPress={() => Alert.alert("", "It will be cover with web page link.")}
                        path={share} />
                </WRow>
            </WView>
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    },
    imageStyle: {
        width: 60,
        height: 60
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
    container: {
        elevation: 1,
        borderColor: Palette.border_color,
        borderStyle: 'solid'
    }
}