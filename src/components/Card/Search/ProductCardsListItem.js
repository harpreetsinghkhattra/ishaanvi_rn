import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Image, Linking, Alert } from 'react-native';
import { WText, WView, WRow, WSpinner, WTouchable, Image as WImage } from '../../common';
import { RecentProductsItem } from '../../ListItems/';
import Palette from '../../../Palette';
import { routerNames } from '../../../RouteConfig';

const IMAGE_CARD_WIDTH = 150;

export default class ProductsCardsListItem extends PureComponent {

    static propTypes = {
        onItemPress: PropTypes.func,
        isMore: PropTypes.bool
    }

    static defaultProps = {
        isMore: false
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

        data = data && data.length ? data[0] : data && data._id ? data : {};

        if (data._id)
            history.push(routerNames.chat_room, {
                receiverId: data._id,
                image: data && data.imageUrl ? { uri: data.imageUrl } : require("../../../images/profile.png")
            });
    }

    openScreen1 = (path, value = {}) => {
        const { history } = this.props;

        alert(JSON.stringify(value))
        history.push(path, value);
    }

    render = () => {
        const { heading, item: data, isLoading, isViewMore, onPress, userId, onItemPress, isMore } = this.props;
        const { imageStyle, iconStyle, container, ratingContainer, viewContainer } = styles;

        const message = require('../../../images/message.png');
        const phone = require('../../../images/phone.png');
        const share = require('../../../images/share1.png');
        const star = require('../../../images/star.png');
        const view = require('../../../images/show_password.png');

        const { name, price, discount, images, views, rating, reviews, _id, userInfo: userData } = data;

        let userInfo = userData && userData.length ? userData[0] : userData;

        // <WView dial={4} margin={[5, 5]} style={[stretch, container]}>
        //         <WRow dial={4} padding={[5, 0]} style={[stretch]}>
        //             <WView dial={5} padding={[0, 5]}>
        //                 <Image source={images && images.length ? { uri: images[0] } : require("../../../images/product-dummy.png")} style={imageStyle} />
        //             </WView>
        //             <WView flex dial={4} padding={[0, 5]}>
        //                 <WText color={Palette.black} fontFamily={"Muli-Bold"} fontSize={14}>{name}</WText>
        //                 <WRow dial={4}>
        //                     <WText padding={[0, 5]} color={Palette.line_color} style={{ textDecorationLine: 'line-through' }}>{`₹ ${parseFloat(price).toFixed(2)} `}</WText>
        //                     <WText padding={[0, 5]} color={Palette.black}>
        //                         {`₹ ${parseFloat((parseFloat(price) - (parseFloat(discount) / 100) * parseFloat(price))).toFixed(2)}`}
        //                     </WText>
        //                 </WRow>
        //                 <WView dial={5} padding={[1, 5]} margin={[2, 0]} backgroundColor={Palette.green}>
        //                     <WText color={Palette.white}>{`${discount}% OFF`}</WText>
        //                 </WView>
        //                 <WRow dial={4}>
        //                     <WRow dial={5} padding={[0, 5]} style={ratingContainer}>
        //                         <Image source={star} style={[iconStyle, { tintColor: Palette.ratingColor }]} />
        //                         <WText padding={[0, 0, 0, 5]} color={Palette.black}>{rating ? parseFloat(rating).toFixed(1) : 0}</WText>
        //                     </WRow>
        //                     <WText padding={[0, 5]} color={Palette.black}>({reviews ? reviews : 0} ratings)</WText>
        //                 </WRow>
        //             </WView>
        //             <WView dial={2} padding={[2, 5]}>
        //                 <WTouchable onPress={onItemPress ? onItemPress.bind(this, _id) : this.openScreen1.bind(this, routerNames.view_product, { productId: _id })} style={btnContainer} dial={5} padding={[0, 10]}>
        //                     <WText center color={Palette.white} fontSize={14} fontFamily={"Muli-Bold"}>Visit</WText>
        //                 </WTouchable>
        //             </WView>
        //         </WRow>
        //         <WRow dial={4} backgroundColor={Palette.line_color} style={{ justifyContent: 'space-between' }}>
        //             <WRow dial={4}>
        //                 <this.Btn
        //                     onPress={this.dialNumber.bind(this, userInfo)}
        //                     path={phone} />
        //                 <this.Btn
        //                     onPress={this.openScreen.bind(this, userInfo)}
        //                     path={message} />
        //                 <this.Btn
        //                     onPress={() => Alert.alert("", "It will be cover with web page link.")}
        //                     path={share} />
        //             </WRow>
        //             <WRow dial={5} padding={[0, 5]} margin={[0, 10]} style={[viewContainer]} backgroundColor={Palette.theme_color}>
        //                 <Image source={view} style={[iconStyle, { tintColor: Palette.white }]} />
        //                 <WText padding={[0, 0, 0, 5]} color={Palette.white}>{views ? views : 0}</WText>
        //             </WRow>
        //         </WRow>
        //     </WView >

        return (
            <WView dial={5} stretch spaceBetween margin={[5, 5]} style={container}>
                <Image source={images && images.length ? { uri: images[0] } : require("../../../images/product-dummy.png")} style={imageStyle} resizeMode="cover" />
                <WView dial={4}>
                    <WText color={Palette.black} fontFamily={"Muli-Bold"} fontSize={14}>{name}</WText>
                </WView>
                <WView dial={4} stretch>
                    <WText padding={[0, 5]} color={Palette.black}>
                        {`₹ ${parseFloat((parseFloat(price) - (parseFloat(discount) / 100) * parseFloat(price))).toFixed(2)}`}
                    </WText>
                    <WText padding={[0, 5]} color={Palette.line_color} style={{ textDecorationLine: 'line-through' }}>{`₹ ${parseFloat(price).toFixed(2)} `}</WText>
                    <WRow spaceBetween stretch dial={6} margin={[2, 0]}>
                        <WText padding={[1, 5]} style={{ backgroundColor: Palette.green }} color={Palette.white} center>{`${discount}% OFF`}</WText>
                        <WRow dial={5} padding={[0, 5]} style={[viewContainer]} backgroundColor={Palette.theme_color}>
                            <Image source={view} style={[iconStyle, { tintColor: Palette.white }]} />
                            <WText padding={[0, 0, 0, 5]} color={Palette.white}>{views ? views : 0}</WText>
                        </WRow>
                    </WRow>
                </WView>

                {
                    isMore ? 
                    <WRow margin={[2, 0]} dial={4}>
                    <WRow dial={5} padding={[0, 5]} style={ratingContainer}>
                        <Image source={star} style={[iconStyle, { tintColor: Palette.ratingColor }]} />
                        <WText padding={[0, 0, 0, 5]} color={Palette.black}>{rating ? parseFloat(rating).toFixed(1) : 0}</WText>
                    </WRow>
                    <WText padding={[0, 5]} color={Palette.black}>({reviews ? reviews : 0} ratings)</WText>
                </WRow> : null
                }

                {
                    isMore ? 
                    <WRow spaceBetween dial={6} >
                    <this.Btn
                        onPress={this.dialNumber.bind(this, userInfo)}
                        path={phone} />
                    <this.Btn
                        onPress={this.openScreen.bind(this, userInfo)}
                        path={message} />
                    <this.Btn
                        onPress={() => Alert.alert("", "It will be cover with web page link.")}
                        path={share} />
                </WRow> : null
                }
            </WView>
        )
    }
}

const styles = {
    imageStyle: {
        width: 150,
        height: 200,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Palette.line_color,
        borderStyle: 'solid'
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
        width: IMAGE_CARD_WIDTH
    },
    ratingContainer: {
        borderColor: Palette.border_color,
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1
    },
    viewContainer: {
        borderRadius: 5
    }
}