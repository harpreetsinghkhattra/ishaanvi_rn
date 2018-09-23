import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio, Alert } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { Api } from '../../api/Api';
import { AlertMessage } from '../Modal/';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper/';
const UserData = new Storage();

export default class ResetPassword extends Component {

    state = {
        isLoading: false,
        errors: [],
        alertMessageVisible: false,
        alertMessage: {}
    }

    constructor(props) {
        super(props);

        this.requestBody = {
            password: "",
            confirm_password: "",
        }
    }

    componentDidMount = () => {
        var data = User.getUserData();
        console.log("data", data);

        Object.assign(this.requestBody, { email: data.email });
    }

    setAlertMessageVisible(alertMessageVisible, alertMessage) {
        this.setState({ alertMessageVisible, alertMessage });
    }

    /** On change */
    onTextChange = (key, value) => {
        Object.assign(this.requestBody, { [key]: value })
    }

    /** On submit */
    sumbit = () => {
        const { history } = this.props;
        console.log(this.requestBody);

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Api.resetPassword(Object.keys(this.requestBody), this.requestBody)
                .then(res => {
                    this.setState({ isLoading: false });
                    if (res && res.data) {
                        if (res.message === "Success") {
                            User.setUserData(res.data);
                            UserData.setUserData(StorageKeys.USER_DATA, res.data); 
                            history.push(routerNames.index);
                        } else if (res.message === "NoValue") this.setAlertMessageVisible(true, { status: res.message, heading: "Not present!", message: "Email does not exists, Please try again" });
                        else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again!" });
                    } else if (res && res.response) {
                        const { status, response } = res;
                        console.log("res status", response);
                        this.setState({ errors: response && response.length ? response : [] });
                    }
                })
                .catch(err => console.log(err));
        });
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
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, alertMessageVisible, alertMessage } = this.state;

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Reset password"} />
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
                                placeholderName={"*New Passowrd (at least 5 characters)"}
                                isLoading={isLoading}
                                isError={this.isError("password")}
                                iconPath={require("../../images/lock.png")}
                                secureTextEntry={true}
                                onChangeText={value => this.onTextChange("password", value)}
                                getFocus={ref => this.input1 = ref}
                                onSubmitEditing={() => this.input2 && this.input2.focus()}
                            />
                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"*Confirm Password"}
                                isLoading={isLoading}
                                isError={this.isError("confirm_password")}
                                iconPath={require("../../images/lock.png")}
                                secureTextEntry={true}
                                onChangeText={value => this.onTextChange("confirm_password", value)}
                                getFocus={ref => this.input2 = ref}
                                onSubmitEditing={this.sumbit.bind(this)}
                            />
                            <Large
                                label="Submit"
                                margin={[10, 0]}
                                isLoading={isLoading}
                                onPress={this.sumbit.bind(this)}
                            />
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
