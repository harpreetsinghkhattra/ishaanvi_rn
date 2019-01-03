import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable } from '../../components/common';
import { ScrollView, PixelRatio, Image } from 'react-native';
import Palette from '../../Palette';
import { routerNames } from '../../RouteConfig';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { Section } from '../../components/Label';
import { PostOffer } from '../../model/PostOffer';
import { Api } from '../../api/Api';
import { HeadingDetail, OtherInfo, ImageSlider, BottomBar, ShareAndCommentBar, ProductUserData } from '../../components/ViewPost';
import { RecentProductsList } from '../../components/Lists';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 50;

export default class ViewPost extends Component {

    state = {
        item: {}
    }

    componentDidMount = () => {
    }

    onBack = () => {
        const { history, location } = this.props;

        if (location.state && location.state.screenType === "home")
            history.replace(routerNames.index, { selectedIndex: 0 })
        else history.go(-1);
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, floatBtn, icon } = styles;
        const { item } = this.state;
        const back = require('../../images/back.png');
        // const { images } = item;
        const images = [
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg',
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg',
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg',
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg',
            'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/b/l/block-printed-modal-satin-dress-in-pastel-blue-v1-tqm153.jpg'
        ];

        return (
            <WView dial={2} flex style={stretch}>
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start', paddingBottom: BOTTOM_STATUS_BAR }, stretch]}>
                    {
                        images && images.length ?
                            <ImageSlider
                                {...this.props}
                                data={images} />
                            : null
                    }
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        <WView flex dial={2} style={[stretch]}>
                            <HeadingDetail
                                item={item} />
                            <OtherInfo
                                item={item} />
                            <ShareAndCommentBar />
                            <ProductUserData />
                            <RecentProductsList
                                data={[
                                    { price: '100', discount: '10' },
                                    { price: '100', discount: '10' },
                                    { price: '100', discount: '10' },
                                    { price: '100', discount: '10' },
                                    { price: '100', discount: '10' },
                                    { price: '100', discount: '10' }
                                ]}
                                isViewMore={false}
                                heading={"Similar Products"} />
                        </WView>
                    </WView>
                </ScrollView>

                <WTouchable onPress={this.onBack.bind(this)} dial={5} style={floatBtn}>
                    <Image source={back} style={icon} />
                </WTouchable>
                <BottomBar
                    leftBtnLabel={"Add to Wish List"}
                    rightBtnLabel={"Rate Us"}
                />
            </WView >
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    },
    btnStyle: {
        backgroundColor: Palette.create_add_continue_btn,
        alignSelf: "stretch",
        height: 52,
        borderRadius: 5
    },
    btnContainer: {
        height: 74
    },
    border: {
        borderStyle: "solid",
        borderBottomWidth: (5 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.theme_color
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: Palette.white
    },
    floatBtn: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: 50,
        height: 50,
        borderRadius: 25
    }
}
