import React, { Component } from 'react'
import { WView, WText, WRow, Header, WSpinner } from '../../components/common';
import { ScrollView, Image } from 'react-native';
import Palette from '../../Palette';
import { WithLeftIcon } from '../../components/UI/btn/'
import { routerNames } from '../../RouteConfig';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { Api } from '../../api/Api';
import { User } from '../../model/user';
import { AlertMessage } from '../Modal/';
import { Storage, StorageKeys, Helper } from '../../helper';
const UserData = new Storage();

export default class SelectAuthType extends Component {

    state = {
        isLoading: false,
        alertMessageVisible: false,
        alertMessage: {}
    }

    /** Login with facebook */
    fbLogin = () => {
        const { history } = this.props;
        const scop = this;
        LoginManager.logOut();
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
                                if (err) scop.setAlertMessageVisible(true, { status: "Error", heading: "Internal Error!", message: "Please try again!" });
                                else if (result && result.id && result.email) {
                                    const { id: userId, name, picture, email } = result;
                                    const imageUrl = picture ? picture.data.url : '';

                                    const body = { userId, name, email, imageUrl };
                                    console.log(body);
                                    scop.submit(body);
                                } else scop.setAlertMessageVisible(true, { status: 'NotValid', heading: "Required!", message: "Email is not present, Please try with another account" });
                            }
                        );
                        // Start the graph request.
                        new GraphRequestManager().addRequest(infoRequest).start();
                    }, (err) => {
                        console.log("err", err);
                        scop.setAlertMessageVisible(true, { status: 'NotValid', heading: "Internal Error!", message: "Please try again!" });
                    });
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error);
                scop.setAlertMessageVisible(true, { status: "Error", heading: "Internal Error!", message: "Please try again!" });
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
            if (userInfo && userInfo.user && userInfo.user.email) {
                const { email, id: userId, photo: imageUrl, name } = userInfo.user;
                const body = { email, userId, imageUrl, name };
                this.submit(body);
            } else this.setAlertMessageVisible(true, { status: 'NotValid', heading: "Required!", message: "Email is not present, Please try with another account" });
            console.log(userInfo.user);
        } catch (error) {
            this.setAlertMessageVisible(true, { status: 'NotValid', heading: "Internal Error!", message: "Please try again" });
        }
    };

    submit = (body) => {
        const { history } = this.props;

        this.setState(() => ({ isLoading: true }), () => {
            Api.loginViaSocialMedia(Object.keys(body), body)
                .then(res => {
                    this.setState({ isLoading: false });
                    if (res && res.data) {
                        if (res.message === "Success") {
                            User.setUserData(res.data);
                            if (res.data && res.data.verificationCode === 0) history.push(routerNames.verification, { data: res.data });
                            else if (res.data.forgetPassword) history.push(routerNames.resetPassword);
                            else {
                                UserData.setUserData(StorageKeys.USER_DATA, res.data);
                                Helper.resetAndPushRoot(history, routerNames.index);
                            }
                        } else if (res.message === "NotValid") this.setAlertMessageVisible(true, { status: res.message, heading: "User Not Valid!", message: "User/Password incorrect, Please try again" });
                        else if (res.message === "Blocked") this.setAlertMessageVisible(true, { status: res.message, heading: "User is Blocked!", message: "Contact your admin, Please try again" });
                        else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again!" });
                    } else if (res && res.response) {
                        const { status, response } = res;
                        this.setState({ errors: response && response.length ? response : [] });
                    }
                })
                .catch(err => console.log(err));
        })
    }

    setAlertMessageVisible(alertMessageVisible, alertMessage) {
        this.setState({ alertMessageVisible, alertMessage });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, iconDesign, logoStyle } = styles;
        const { alertMessageVisible, alertMessage, isLoading } = this.state;
        const logo = require("../../images/logo.png");

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <Header
                    label="Sign up or Log in"
                    onPress={() => history.goBack()}
                />
                <AlertMessage
                    isVisible={alertMessageVisible}
                    data={alertMessage}
                    {...this.props}
                    setVisible={this.setAlertMessageVisible.bind(this, false)} />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader }, stretch]}>
                    <WView dial={5} flex padding={[10, 10]} backgroundColor={Palette.white} style={[stretch]}>
                        <WView dial={5} flex>
                            {/*<WText fontSize={30} fontFamily="Muli-Bold" center padding={[20, 0]} color={Palette.text_color}>ISHAANVI</WText>*/}
                            <Image source={logo} style={logoStyle} />
                        </WView>
                        <WView dial={5} flex>
                            <WithLeftIcon
                                onPress={this.fbLogin.bind(this)}
                                isLoading={isLoading}
                                label="Continue with Facebook"
                                iconPath={require("../../images/facebook_logo.png")}
                                style={{ backgroundColor: Palette.facebook_logo }}
                            />
                            <WText fontSize={14} center padding={[5, 0]} color={Palette.text_color}>or continue with</WText>
                            <WRow dial={5}>
                                <WithLeftIcon
                                    label="Google"
                                    isLoading={isLoading}
                                    onPress={this.getCurrentUser.bind(this)}
                                    iconPath={require("../../images/google_logo.png")}
                                    iconStyle={{ width: 18, height: 18, tintColor: Palette.white }}
                                    style={{ marginRight: 10, flex: 1 }}
                                />
                                <WithLeftIcon
                                    label="Email"
                                    isLoading={isLoading}
                                    onPress={() => history.push(routerNames.login)}
                                    iconStyle={{ width: 18, height: 18, tintColor: Palette.white }}
                                    iconPath={require("../../images/via_email.png")}
                                    style={{ marginBottom: 10, flex: 1 }}
                                />
                            </WRow>
                            {
                                isLoading &&
                                <WView dial={5}>
                                    <WSpinner size={"small"} color={Palette.theme_color} />
                                    <WText center padding={[5, 0]} color={Palette.border_color}>{"Ishaanvi is fetching data, Please wait..."}</WText>
                                </WView>
                            }
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
    },
    logoStyle: {
        width: 110,
        height: 110,
        tintColor: Palette.theme_color
    }
}
