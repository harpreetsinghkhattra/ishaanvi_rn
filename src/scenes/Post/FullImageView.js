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
import { FullImage } from '../../components/ViewPost';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 56;

export default class ViewPost extends Component {

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, backBtn } = styles;

        return (
            <WView dial={2} flex style={stretch}>
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start' }, stretch]}>
                    <FullImage
                        {...this.props}
                    />
                    <WTouchable onPress={() => history.goBack()} dial={4} style={[backBtn]}>
                        <Image source={require('../../images/back.png')} style={[{ width: 20, height: 20, tintColor: Palette.theme_color }]} />
                    </WTouchable> 
                </ScrollView>
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
    backBtn: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 50,
        height: 50,
    }
}
