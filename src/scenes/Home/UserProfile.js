import React, { PureComponent } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { ChangeImage, EditActionView, UserInfo } from '../../components/Edit';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { Api, Socket, User as UserApi } from '../../api';
import { get_user_profile } from '../../api/SocketUrls';
 
const UserData = new Storage();
const PAGE_INDEX = 4; 

export default class UserProfile extends PureComponent {

    constructor(props) {
        super(props);

        const { initialPage } = this.props;
        this.state = {
            isLoading: false,
            userData: {},
            isLazyLoading: initialPage === PAGE_INDEX ? true : false
        }

        this.listenLazyLoadEvent();
    }

    componentDidMount = () => { 
        const { initialPage } = this.props;

        console.log("user profile =====>", User.getUserData());

        if (initialPage === PAGE_INDEX) this.init();
    }


    listenLazyLoadEvent = () => {
        const { tabEmitter } = this.props;
        if (tabEmitter.addListener) {
            tabEmitter.addListener('home_lazy_load', (data) => {
                if (data && data.index === PAGE_INDEX)
                    this.setState(prevState => {

                        if (!prevState.isLazyLoading) {
                            this.init();
                            return { isLazyLoading: true };
                        }
                    });
            });
        }
    }

    init = () => {
        this.setState({ isLoading: true });
        this.getUserResponse();
        this.setState({ userData: User.getUserData() });
    }

    getUserResponse() {
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        Socket.request(get_user_profile.emit, { id, accessToken });
        UserApi.getSocketResponseOnce(get_user_profile.on, (res) => { 
            if (res && res.message === "Success") {
                User.setUserData(res.data);
                this.setState({ isLoading: false, userData: User.getUserData() });
                // UserData.setUserData(StorageKeys.USER_DATA, res.data);
            }
        });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { userData, isLoading, isLazyLoading } = this.state;
        const empty = [];

        if (!isLazyLoading) return empty;

        return (
            <WView dial={2} flex style={stretch}>
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch]} >
                        <ChangeImage
                            isLoading={isLoading}
                            imageSource={userData && userData.imageUrl ? { uri: userData.imageUrl } : require("../../images/profile.png")} />
                        <UserInfo
                            isLoading={isLoading}
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
