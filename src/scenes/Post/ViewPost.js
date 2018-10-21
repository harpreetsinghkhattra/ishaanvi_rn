import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable } from '../../components/common';
import { ScrollView, PixelRatio, Image } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { ChangeImage, EditActionView, UserInfo } from '../../components/Edit';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { CompleteIndicatorStatus, UploadPhoto } from '../../components/Select/PostOffer';
import { TextInputWithLabel, MultiTextInputWithLabel } from '../../components/UI/input';
import { Section } from '../../components/Label';
import { SelectProductTypeList } from '../../components/Lists';
import { PostOffer } from '../../model/PostOffer';
import { Api } from '../../api/Api';
import { HeadingDetail, OtherInfo, ImageSlider } from '../../components/ViewPost';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 56;

export default class ViewPost extends Component {

    state = {
        item: {}
    }

    componentDidMount = () => {
        this.init();
    }

    init() {
        const { history, location } = this.props;
        const { item } = location.state;
        this.setState({ item });

        console.log('view post', item);
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data);
    }


    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, floatBtn, icon } = styles;
        const { item } = this.state;
        const edit = require('../../images/edit.png');
        const { images } = item;

        return (
            <WView dial={2} flex style={stretch}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Product Details"}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start' }, stretch]}>
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
                        </WView>
                    </WView>
                </ScrollView>

                <WTouchable onPress={this.openScreen.bind(this, routerNames.post_offer_detail, { screenType: "edit", item })} dial={5} style={floatBtn}>
                    <Image source={edit} style={icon} />
                </WTouchable>
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
        bottom: 10,
        right: 10,
        backgroundColor: Palette.theme_color,
        width: 50,
        height: 50,
        borderRadius: 25
    }
}
