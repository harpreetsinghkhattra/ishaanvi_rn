import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { ChangeImage, EditActionView, UserInfo } from '../../components/Edit';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { CompleteIndicatorStatus, UploadPhoto } from '../../components/Select/PostOffer';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 56;

export default class Finish extends Component {

    state = {
        isLoading: false,
        userData: {}
    }

    componentDidMount() {
        this.setState({ userData: User.getUserData() });
    }

    openScreen() {
        const { history, location } = this.props;
        const { screenType, item } = location.state;

        history.go(screenType === 'edit' ? -4 : -3);
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history, location } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { userData } = this.state;
        const { screenType, item } = location.state;

        return (
            <WView dial={2} flex style={stretch}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Done"}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        <WView flex dial={5}>
                            <WText fontSize={20} color={Palette.theme_color} fontFamily={"Muli-Bold"} center>Success!</WText>
                            <WText fontSize={14} color={Palette.border_color} center>{`Product successfully ${screenType === 'edit' ? 'updated' : 'created'}.`}</WText>
                        </WView>
                        <Large
                            label="Done"
                            onPress={this.openScreen.bind(this)}
                            style={{ marginTop: 10 }}
                        />
                    </WView>
                </ScrollView>
                <CompleteIndicatorStatus
                    maxSelectedIndexNumber={3} />
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
