import React, { Component } from 'react';
import { View, Text, Image, NativeModules, Platform, Linking } from 'react-native';
import Palette from '../../Palette';
import { TabView, Template } from './';
import TabViews from '../../components/Tabs/TabViews';
import { WView, WTouchable, WText } from '../../components/common/';
import { routerNames } from '../../RouteConfig';
import { Storage, StorageKeys, Helper } from '../../helper';



export default class GetStarted extends Component {

    constructor(props) {
        super(props);

        this.closeSplashScreen();
    }

    openScreen(path, data) {
        const { history } = this.props;

        history.push(path, data ? data : {});
    }


    state = {
        selectedIndex: 0
    }

    closeSplashScreen() {
        if (Platform.OS === "android") {
            NativeModules.AndroidCommon.closeSplashScreen();
        }
    }

    Header = () => {
        const { selectedIndex } = this.state;
        return <WView dial={6} margin={[0, 10]} style={{
            backgroundColor: Palette.white,
            height: 56
        }}>
            {selectedIndex === 3 ? null : <WText onPress={this.onSubmit.bind(this)} fontSize={16} fontFamily={"Muli-Bold"}>Skip</WText>}
        </WView>
    }

    Button = () => {
        const { selectedIndex } = this.state;

        return <WView dial={5} margin={[10, 10]} stretch style={{
            height: 56
        }}>
            <WTouchable dial={5} onPress={selectedIndex === 3 ? this.onSubmit.bind(this) : this.onNextPress.bind(this)} padding={[10, 10]} style={{
                backgroundColor: Palette.theme_color
            }}>
                <WText fontSize={16} fontFamily={"Muli-Bold"} color={Palette.white}>{selectedIndex === 3 ? "Get Started" : "Next"}</WText>
            </WTouchable>
        </WView>
    }

    onNextPress = () => {
        this.tabsViewRef && this.tabsViewRef._goToNextPage();
    }

    onSubmit = () => {
        const { history } = this.props;
        Helper.resetAndPushRoot(history, routerNames.selectUserAction);
        new Storage().setUserData(StorageKeys.getStartedScreens, JSON.stringify({ isViewed: true }));
    }

    onSetPage = (selectedIndex) => {
        this.setState({ selectedIndex });
    }

    render() {
        const empty = [];
        const ai_1 = require("../../images/1ia.jpg");
        const ai_2 = require("../../images/2ia.jpg");
        const ai_3 = require("../../images/3ia.jpg");
        const ai_4 = require("../../images/4ia.png");

        const views = [
            <Template
                label={"Sell or buy.\n Almost everything."}
                source={ai_1} />,
            <Template
                label={"Explore the local fashion scene."}
                source={ai_2} />,
            <Template
                label={"List in a snap.\n From your phone."}
                source={ai_3} />,
            <Template
                label={"Find out where to buy the latest looks/items in near you."}
                source={ai_4} />
        ];

        const { screenWidth, screenHeight, history } = this.props;
        const { alertMessageVisible } = this.state;

        const _renderHeader = () => {
            let tabs = [1, 2, 3, 4];
            return (
                <TabView
                    tabs={tabs}
                    onSetPage={this.onSetPage.bind(this)}
                    tabEmitter={this._tabEmitter}
                    iconStyle={{ tintColor: Palette.white }}
                />
            );
        }

        return (
            <WView dial={2} flex={1} style={[{ width: screenWidth, minHeight: screenHeight }]}>
                <WView dial={2} flex style={{ alignSelf: 'stretch', alignItems: 'stretch' }}>
                    <this.Header />
                    <TabViews
                        tabPosition="bottom"
                        indicator={_renderHeader()}
                        initialPage={0}
                        horizontalScroll={true}
                        ref={ref => this.tabsViewRef = ref}
                        style={{ flex: 1 }}
                    >
                        {views.map((ele, index) =>
                            <WView key={`get-stated-tab-${index}`}>
                                {ele}
                            </WView>
                        )}
                    </TabViews>
                    <this.Button />
                </WView>
            </WView>
        )
    }
}
