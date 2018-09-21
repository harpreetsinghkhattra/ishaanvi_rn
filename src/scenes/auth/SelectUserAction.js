import React, { Component } from 'react'
import { WView, WText, WRow, Header } from '../../components/common';
import { ScrollView, Image } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn/'
import { routerNames } from '../../RouteConfig';

export default class SelectAdType extends Component {

    next = (path) => {
        const { history } = this.props;
        history.push(path);
    }

    render() {
        const { screenWidth, screenHeight, history } = this.props;
        const { stretch, btnStyle, btnContainer, iconDesign } = styles;

        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeight, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex={0.6} dial={5} padding={[10, 10]} backgroundColor={Palette.theme_color} style={{ justifyContent: "space-around" }}>
                        <WText fontSize={30} fontFamily="Muli-Bold" padding={[20, 10]} color={Palette.white}>ISHAANVI</WText>
                        <WRow dial={5} padding={[20, 10]}>
                            <WView dial={5} flex>
                                <Image source={require("../../images/buyer.png")} style={iconDesign} />
                                <WText color={Palette.white} fontSize={14}>Buy</WText>
                            </WView>
                            <WView dial={5} flex>
                                <Image source={require("../../images/seller.png")} style={iconDesign} />
                                <WText color={Palette.white} fontSize={14}>Sell</WText>
                            </WView>
                            <WView dial={5} flex>
                                <Image source={require("../../images/adore.png")} style={iconDesign} />
                                <WText color={Palette.white} fontSize={14}>Adore</WText>
                            </WView>
                        </WRow>
                        <WText fontSize={30} fontFamily="Muli-Bold" padding={[20, 10]} fontWeight="bold" padding={[10, 20]} color={Palette.white}>LOCALLY</WText>
                    </WView>
                    <WView flex={0.4} dial={5} padding={[20, 10]} backgroundColor={Palette.white}>
                        <Large
                            label="List Your Buisness"
                            onPress={this.next.bind(this, routerNames.registerSellerSelectCategory)}
                            style={{ marginBottom: 10 }}
                        />
                        <Large
                            label="User/Buyer"
                            onPress={this.next.bind(this, routerNames.selectAuthType)}
                        />
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
    iconDesign: {
        width: 14,
        height: 14,
        tintColor: Palette.white
    }
}
