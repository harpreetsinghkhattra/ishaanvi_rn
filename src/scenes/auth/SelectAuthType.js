import React, { Component } from 'react'
import { WView, WText, WRow, Header } from '../../components/common';
import { ScrollView, Image } from 'react-native';
import Palette from '../../Palette';
import { WithLeftIcon } from '../../components/UI/btn/'
import { routerNames } from '../../RouteConfig';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

export default class SelectAdType extends Component {

    /** Login with facebook */
    fbLogin = () => {
        const { history } = this.props;
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    console.log('Login success with permissions: '
                        + result.grantedPermissions.toString(), result);
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const infoRequest = new GraphRequest(
                            '/me?fields=name,picture,email', 
                            null,
                            (err, result) => {
                                console.log(err, result) 
                                if (err) alert("Please try again");
                                else if (result && result.id) {
                                    history.push(routerNames.index);
                                }
                            }
                        );
                        // Start the graph request.
                        new GraphRequestManager().addRequest(infoRequest).start();
                    }, (err) => console.log("err", err));
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error);
            }
        );
    }

    componentDidMount = () => {
        GoogleSignin.configure({
            webClientId: '188837734533-pifu0ej3a6l4krfjkfjolp9hhblsnqcc.apps.googleusercontent.com',
            offlineAccess: false
        });
    }

    getCurrentUser = async () => {
        const { history } = this.props;

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (userInfo && userInfo.accessToken) {
                history.push(routerNames.index);
            } else alert("Please try again");
            console.log(userInfo);
        } catch (error) {
            console.log("error", error)
        }
    };

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, iconDesign } = styles;

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <Header
                    label="Sign up or Log in"
                    onPress={() => history.goBack()}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader }, stretch]}>
                    <WView dial={5} flex padding={[10, 10]} backgroundColor={Palette.white} style={[stretch]}>
                        <WView dial={5} flex>
                            <WText fontSize={30} fontFamily="Muli-Bold" center padding={[20, 0]} color={Palette.text_color}>ISHAANVI</WText>
                        </WView>
                        <WView dial={5} flex>
                            <WithLeftIcon
                                onPress={this.fbLogin.bind(this)}
                                label="Continue with Facebook"
                                iconPath={require("../../images/facebook_logo.png")}
                                style={{ backgroundColor: Palette.facebook_logo }}
                            />
                            <WText fontSize={14} center padding={[5, 0]} color={Palette.text_color}>or continue with</WText>
                            <WRow dial={5}>
                                <WithLeftIcon
                                    label="Google"
                                    onPress={this.getCurrentUser.bind(this)}
                                    iconPath={require("../../images/google_logo.png")}
                                    iconStyle={{ width: 18, height: 18 }}
                                    style={{ marginRight: 10, flex: 1 }}
                                />
                                <WithLeftIcon
                                    label="Email"
                                    onPress={() => history.push(routerNames.login)}
                                    iconStyle={{ width: 18, height: 18, tintColor: Palette.white }}
                                    iconPath={require("../../images/via_email.png")}
                                    style={{ marginBottom: 10, flex: 1 }}
                                />
                            </WRow>
                        </WView>
                        <WView dial={8} flex backgroundColor={Palette.white}>
                            <WView dial={5} padding={[20, 10]}>
                                <WText center fontSize={14} lines={5}> By Continuing, you agree to ISHAANVI <WText fontSize={14} color={Palette.theme_color}>Terms of Service</WText> and <WText fontSize={14} color={Palette.theme_color}>Privacy Policy</WText> </WText>
                                <WText> Version 0.0.1 </WText>
                            </WView>
                        </WView>
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
