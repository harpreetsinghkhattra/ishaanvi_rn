import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio, Alert, Image } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { CheckBox } from '../../components/UI/checkbox';
import { routerNames } from '../../RouteConfig';
import { Api } from '../../api/Api';
import { AlertMessage } from '../Modal/';

export default class Register extends Component {

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
            mobile_number: "",
            confirm_password: "",
            terms_and_conditions: undefined
        }
    }

    /** On change */
    onTextChange = (key, value) => {
        Object.assign(this.requestBody, { [key]: value })
    }

    /** On submit */
    sumbit = () => {
        const { history } = this.props;

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Api.register(Object.keys(this.requestBody), this.requestBody)
                .then(res => {
                    console.log("res ===>", res);
                    this.setState({ isLoading: false });
                    if (res && res.data) {
                        if (res.message === "Success") {
                            history.push(routerNames.login);
                        } else if (res.message === "Present") this.setAlertMessageVisible(true, { status: res.message, heading: "User is Present!", message: "Please try with another email id" });
                        else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" })
                    } else if (res && res.response) {
                        const { status, response } = res;
                        console.log("res status", response);
                        this.setState({ errors: response && response.length ? response : [] });
                    }
                })
                .catch(err => console.log(err));
        });
    }

    setAlertMessageVisible(alertMessageVisible, alertMessage) {
        this.setState({ alertMessageVisible, alertMessage });
    }

    /** On error */
    isError = (key) => {
        const { errors } = this.state;

        if (errors && errors.length) {
            return errors.findIndex(ele => (ele.fieldName === key)) > -1 ? { status: true, message: errors[errors.findIndex(ele => (ele.fieldName === key))].message } : { status: false, message: "" };
        } else return { status: false, message: "" }
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border, logoStyle } = styles;
        const { isLoading, alertMessage, alertMessageVisible } = this.state;
        const logo = require("../../images/logo.png");

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <Header
                    label={"Sign up"}
                    onPress={() => history.goBack()} />
                <AlertMessage
                    isVisible={alertMessageVisible}
                    data={alertMessage}
                    {...this.props}
                    setVisible={this.setAlertMessageVisible.bind(this, false)} />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={5} padding={[0, 20]} style={[stretch]} >
                        <WView flex dial={5}>
                            {/*<WText center fontFamily={"Muli-Bold"} fontSize={30}>ISHAANVI</WText>*/}
                            <Image source={logo} style={logoStyle}/>
                        </WView>
                        <WView flex dial={2} style={[stretch]}>
                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"*Email"}
                                isLoading={isLoading}
                                isError={this.isError("email")}
                                iconPath={require("../../images/via_email.png")}
                                onChangeText={value => this.onTextChange("email", value)}
                                getFocus={ref => this.input1 = ref}
                                onSubmitEditing={() => this.input2 && this.input2.focus()}
                            />
                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"*Mobile Number"}
                                isError={this.isError("mobile_number")}
                                isLoading={isLoading}
                                keyboardType={"numeric"}
                                onChangeText={value => this.onTextChange("mobile_number", value)}
                                getFocus={ref => this.input2 = ref}
                                iconPath={require("../../images/mobile_phone.png")}
                                onSubmitEditing={() => this.input3 && this.input3.focus()}
                            />
                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"*Password (at least 5 characters)"}
                                isError={this.isError("password")}
                                isLoading={isLoading}
                                onChangeText={value => this.onTextChange("password", value)}
                                iconPath={require("../../images/lock.png")}
                                secureTextEntry={true}
                                getFocus={ref => this.input3 = ref}
                                onSubmitEditing={() => this.input4 && this.input4.focus()}
                            />
                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"*Confirm Password"}
                                isError={this.isError("confirm_password")}
                                onChangeText={value => this.onTextChange("confirm_password", value)}
                                isLoading={isLoading}
                                secureTextEntry={true}
                                iconPath={require("../../images/lock.png")}
                                getFocus={ref => this.input4 = ref}
                                onSubmitEditing={this.sumbit.bind(this)}
                            />
                            <WRow dial={4} padding={[10, 0]}>
                                <CheckBox
                                    onPress={value => this.onTextChange("terms_and_conditions", value)}
                                    isLoading={isLoading}
                                    isError={this.isError("terms_and_conditions")}
                                />
                                <WText padding={[0, 10]} fontSize={14}>T&C</WText>
                            </WRow>
                            <WRow dial={4} padding={[10, 0]} style={{ justifyContent: "space-between" }}>
                                <Large
                                    flex={1}
                                    label="CONTINUE"
                                    isLoading={isLoading}
                                    onPress={this.sumbit.bind(this)}
                                    style={{ marginRight: 10 }}
                                />
                                <WText padding={[10, 5]} onPress={() => history.push(routerNames.login)}>Already a member? Login</WText>
                            </WRow>
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
    },
    logoStyle: {
        width: 110,
        height: 110,
        tintColor: Palette.theme_color 
    }
}
