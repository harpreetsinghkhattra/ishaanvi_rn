import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio, Alert } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { Api } from '../../api/Api';
import { User } from '../../model/user';
import { AlertMessage } from '../Modal/';
import { Storage, StorageKeys, Helper } from '../../helper';
const UserData = new Storage();

export default class Login extends Component {

    state = {
        isLoading: false,
        errors: [],
        alertMessageVisible: false,
        alertMessage: {}
    }

    constructor(props) {
        super(props);

        this.requestBody = {
            email: "",
            password: "",
        }
    }

    /** On change */
    onTextChange = (key, value) => {
        Object.assign(this.requestBody, { [key]: value })
    }

    /** On error */
    isError = (key) => {
        const { errors } = this.state;
        if (errors && errors.length) {
            return errors.findIndex(ele => (ele.fieldName === key)) > -1 ? { status: true, message: errors[errors.findIndex(ele => (ele.fieldName === key))].message } : { status: false, message: "" };
        } else return { status: false, message: "" }
    }

    /** On submit */
    sumbit = () => {
        const { history } = this.props;

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Api.login(Object.keys(this.requestBody), this.requestBody)
                .then(res => {
                    console.log("res ===>", res);
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
                        else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again!" });
                    } else if (res && res.response) {
                        const { status, response } = res;
                        this.setState({ errors: response && response.length ? response : [] });
                    }
                })
                .catch(err => console.log(err));
        });
    }

    setAlertMessageVisible(alertMessageVisible, alertMessage) {
        this.setState({ alertMessageVisible, alertMessage });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, alertMessageVisible, alertMessage } = this.state;

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Login"}
                />
                <AlertMessage
                    isVisible={alertMessageVisible}
                    data={alertMessage}
                    {...this.props}
                    setVisible={this.setAlertMessageVisible.bind(this, false)} />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={5} padding={[0, 20]} style={[stretch]} >
                        <WView flex dial={5}>
                            <WText center fontFamily={"Muli-Bold"} fontSize={30}>ISHAANVI</WText>
                        </WView>
                        <WView flex dial={2} style={[stretch]}>

                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"Email"}
                                isLoading={isLoading}
                                isError={this.isError("email")}
                                iconPath={require("../../images/via_email.png")}
                                onChangeText={value => this.onTextChange("email", value)}
                                getFocus={ref => this.input1 = ref}
                                onSubmitEditing={() => this.input2 && this.input2.focus()}
                            />

                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"Password"}
                                isError={this.isError("password")}
                                onChangeText={value => this.onTextChange("password", value)}
                                iconPath={require("../../images/lock.png")}
                                secureTextEntry={true}
                                isLoading={isLoading}
                                getFocus={ref => this.input2 = ref}
                                onSubmitEditing={this.sumbit.bind(this)}
                            />

                            <Large
                                label="Submit"
                                style={{ marginTop: 10 }}
                                isLoading={isLoading}
                                onPress={this.sumbit.bind(this)}
                            />

                            <WView dial={6} padding={[10, 0]}>
                                <WText padding={[10, 5]} onPress={() => history.push(routerNames.register)}>Don't have an account?</WText>
                                <WText padding={[10, 5]} onPress={() => history.push(routerNames.forgetPassword)}>Forgot password?</WText>
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
