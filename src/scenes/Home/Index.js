import React, { PureComponent } from 'react'
import { WView, WText, WRow, Header, WTextInput, WTouchable } from '../../components/common';
import { ScrollView, PixelRatio, Image } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { RecentProductsList } from '../../components/Lists';
import { SearchHeader } from '../../components/Header';
import { Storage, StorageKeys } from '../../helper';
import { User } from '../../model/user';
import { UserLocation } from '../../model/UserLocation';
import { MyLocation, HomeFilter } from '../Modal/';

const UserData = new Storage();

export default class Login extends PureComponent {

    state = {
        isHomeFilterVisible: false,
        isLocationModalVisible: false
    }

    componentDidMount = () => {
        console.log("locations stored data", UserLocation.getUserLocationData());
        this.setState({ isLocationModalVisible: true });
    }

    /** Set visible */
    setLocationModalVisible = (isLocationModalVisible, location) => {
        if (location && typeof location === 'string') {
            // this.onTextChange("userLocation", location);
            // this.setState(() => ({ isVisible }), this.getLocationDetail.bind(this));
        } else this.setState({ isLocationModalVisible })
    }

    /** Set visible */
    setFilterModalVisible = (isHomeFilterVisible, location) => {
        if (location && typeof location === 'string') {
            // this.onTextChange("userLocation", location);
            // this.setState(() => ({ isVisible }), this.getLocationDetail.bind(this));
        } else this.setState({ isHomeFilterVisible })
    }

    openScreen(path) {
        const { history } = this.props;

        history.push(path, {});
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, icon, floatBtn } = styles;
        const { userType } = User.getUserData();
        const { isHomeFilterVisible, isLocationModalVisible } = this.state;
        const plus = require('../../images/plus.png');

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <SearchHeader
                    openFilter={this.setState.bind(this, true)}
                />
                <MyLocation
                    {...this.props}
                    isVisible={isLocationModalVisible}
                    setVisible={this.setLocationModalVisible.bind(this, false)}
                />
                <HomeFilter
                    {...this.props}
                    isVisible={isHomeFilterVisible}
                    setVisible={this.setFilterModalVisible.bind(this, false)}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch]} >
                        <RecentProductsList
                            heading="Google s paldj alkdj laksjd laksjd laskdf alksd sjd fjlsd fsd" />
                        <RecentProductsList
                            heading="Test" />
                        <RecentProductsList
                            heading="Test" />
                    </WView>
                </ScrollView>
                {
                    userType === 1 &&
                    <WTouchable onPress={this.openScreen.bind(this, routerNames.post_offer_detail)} dial={5} style={floatBtn}>
                        <Image source={plus} style={icon} />
                    </WTouchable>
                }
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
