import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WSpinner } from '../../components/common';
import { ScrollView, PixelRatio, Alert } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { CheckBox } from '../../components/UI/checkbox';
import { routerNames } from '../../RouteConfig';
import { Api, Socket, User as UserApi } from '../../api';
import { AlertMessage, AutoComplete } from '../Modal/';
import { User } from '../../model/user';
import { edit_user_profile } from '../../api/SocketUrls';

export default class Register extends Component {

    state = {
        isLoading: false,
        isLocationDetailLoading: false,
        errors: [],
        alertMessageVisible: false,
        alertMessage: {},
        isVisible: false,
        requestBody: {
            id: "",
            accessToken: "",
            name: "",
            mobile_number: "",
            email: "",
            location: "",
            address: ""
        },
    }

    constructor(props) {
        super(props);
    }

    static propTypes = {

    }

    componentDidMount = () => {
        const { history, location } = this.props;
        const { screenType } = location.state;

        this.setState(prevState => {
            const { email, mobile_number, location, address, name, _id, userAccessToken } = User.getUserData();

            const requestBody = {
                id: _id,
                accessToken: userAccessToken,
                email,
                mobile_number,
                name,
                address: address ? address : '',
                location: location && location.lat ? location : { lat: null, lng: null }
            }

            return ({ requestBody });
        });
    }


    /** On change */
    onTextChange = (key, value) => {
        this.setState(prevState => {
            var { requestBody } = prevState;
            return Object.assign(requestBody, { [key]: value });
        });
    }

    /** Set visible */
    setVisible = (isVisible, location) => {
        if (location && typeof location === 'string') {
            this.onTextChange("address", location);
            this.setState(() => ({ isVisible }), this.getLocationDetail.bind(this));
        } else this.setState({ isVisible })
    }

    /** Get location detail */
    getLocationDetail = () => {
        const { requestBody } = this.state;
        this.setState({ isLocationDetailLoading: true });
        Api.getLocationDetail(["address"], { address: requestBody.address })
            .then(res => {
                console.log(res);
                switch (res.status) {
                    case "OK":
                        this.setState({ isLocationDetailLoading: false });
                        res && res.candidates && res.candidates.length && this.onTextChange("location", res.candidates[0].geometry.location);
                        break;
                    default:
                        this.setState({ isLocationDetailLoading: false });
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({ isLocationDetailLoading: false });
            });
    }

    /** Get response */
    getEditUserResponse = () => {
        const { history } = this.props;

        UserApi.editUserSocketResponse((res) => {
            console.log("requestBody", res);

            this.setState({ isLoading: false });
            if (res && res.data) {
                if (res.message === "Success") {
                    // alert('editUserResponse', res.data);
                    history.go(-1);
                } else if (res.message === "Present") this.setAlertMessageVisible(true, { status: res.message, heading: "User is Present!", message: "Please try with another email id" });
                else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" })
            } else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" })
        });
    }

    /** On submit */
    sumbit = () => {
        const { history } = this.props;
        const { requestBody } = this.state;
        const { email, name } = requestBody;

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Api.isValidForm(Object.keys(requestBody), requestBody)
                .then(res => {
                    console.log("requestBody", requestBody);

                    Socket.request(edit_user_profile.emit, requestBody);
                    if (res && res.message === "Success") {
                        this.getEditUserResponse();
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

    /** On error */
    isError = (key) => {
        const { errors } = this.state;

        if (errors && errors.length) {
            return errors.findIndex(ele => (ele.fieldName === key)) > -1 ? { status: true, message: errors[errors.findIndex(ele => (ele.fieldName === key))].message } : { status: false, message: "" };
        } else return { status: false, message: "" }
    }

    onBack = () => {
        const { history } = this.props;

        history.replace(routerNames.index, { selectedIndex: 4})
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, alertMessage, alertMessageVisible, isVisible, requestBody, isLocationDetailLoading } = this.state;
        const { address, email, name, mobile_number } = requestBody;

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <Header
                    label={"Edit User Profile"}
                    onPress={this.onBack.bind(this)} />
                <AlertMessage
                    isVisible={alertMessageVisible}
                    data={alertMessage}
                    {...this.props}
                    setVisible={this.setAlertMessageVisible.bind(this, false)} />
                <AutoComplete
                    isVisible={isVisible}
                    setVisible={this.setVisible.bind(this)}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={5} padding={[0, 20]} style={[stretch]} >
                        <WView flex dial={5}>
                            <WText center fontFamily={"Muli-Bold"} fontSize={30}>ISHAANVI</WText>
                        </WView>
                        <WView flex dial={2} style={[stretch]}>

                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"*Name"}
                                isError={this.isError("name")}
                                isLoading={isLoading}
                                onChangeText={value => this.onTextChange("name", value)}
                                iconPath={require("../../images/user1.png")}
                                getFocus={ref => this.input1 = ref}
                                onSubmitEditing={() => this.input2 && this.input2.focus()}
                                value={name}
                            />

                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"*Email"}
                                isLoading={isLoading}
                                isError={this.isError("email")}
                                iconPath={require("../../images/via_email.png")}
                                onChangeText={value => this.onTextChange("email", value)}
                                getFocus={ref => this.input2 = ref}
                                onSubmitEditing={() => this.input3 && this.input3.focus()}
                                value={email}
                            />
                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"Mobile Number"}
                                isError={this.isError("mobile_number")}
                                isLoading={isLoading}
                                keyboardType={"numeric"}
                                onChangeText={value => this.onTextChange("mobile_number", value)}
                                getFocus={ref => this.input3 = ref}
                                iconPath={require("../../images/mobile_phone.png")}
                                onSubmitEditing={() => this.input4 && this.input4.focus()}
                                value={mobile_number}
                            />

                            <WTextInput
                                margin={[10, 0]}
                                placeholderName={"Address"}
                                isError={this.isError("address")}
                                onChangeText={this.setVisible.bind(this, true)}
                                onFocus={this.setVisible.bind(this, true)}
                                isLoading={isLoading}
                                iconPath={require("../../images/location.png")}
                                getFocus={ref => this.input4 = ref}
                                onSubmitEditing={this.sumbit.bind(this)}
                                value={address}
                            />
                            {
                                isLocationDetailLoading ?
                                    <WView dial={5} padding={[5, 5]}>
                                        <WSpinner size={"small"} color={Palette.theme_color} />
                                        <WText fontFamily={"Muli-Bold"}>Please wait...</WText>
                                    </WView>
                                    : null
                            }
                            <WRow dial={5} padding={[10, 0]} style={{ justifyContent: "center" }}>
                                <Large
                                    flex={1}
                                    label="Submit"
                                    isLoading={isLoading}
                                    onPress={(isLocationDetailLoading) ? () => { } : this.sumbit.bind(this)}
                                />
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
    }
}
