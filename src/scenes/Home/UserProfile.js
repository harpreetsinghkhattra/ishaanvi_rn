import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { ChangeImage, EditActionView, UserInfo } from '../../components/Edit';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';

const UserData = new Storage();

export default class UserProfile extends Component {

    state = {
        isLoading: false,
        userData: {}
    }

    componentDidMount() {
        this.setState({ userData: User.getUserData() });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { userData } = this.state;

        console.log("userData", userData);
        return (
            <WView dial={2} flex style={stretch}>
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch]} >
                        <ChangeImage
                            imageSource={userData && userData.imageUrl ? { uri: userData.imageUrl } : require("../../images/profile.png")} />
                        <UserInfo
                            userData={userData} />
                        <EditActionView
                            {...this.props}
                            userData={userData} />
                    </WView>
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
    }
}