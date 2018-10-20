import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../../components/common';
import { ScrollView, PixelRatio, Alert } from 'react-native';
import Palette from '../../../Palette';
import { Large, WithSeprateIcon } from '../../../components/UI/btn';
import { CheckBox } from '../../../components/UI/checkbox';
import { routerNames } from '../../../RouteConfig';
import { InfoCompleteAutoSelect } from '../../../components/Select/';
import { TextInputWithLabel } from '../../../components/UI/input';
import { InfoCompleteHeader } from '../../../components/Header';
import { RegisterSellerUser } from '../../../model/RegisterSellerUser';
import { Section, WithInfo } from '../../../components/Label';

import { Api, Socket, User as UserApi } from '../../../api';
import { AlertMessage, AutoComplete } from '../../Modal/';
import { User } from '../../../model/user';
import { edit_seller_profile } from '../../../api/SocketUrls';
import { Storage, StorageKeys, Helper } from '../../../helper';

const UserData = new Storage();

export default class ContactInfo extends Component {

    state = {
        isLoading: false,
        errors: [],
        sellerRegisterForm: {},
        alertMessageVisible: false,
        alertMessage: {},
        responseStatus: ''
    }

    componentWillMount = () => {
        this.setState({ sellerRegisterForm: RegisterSellerUser.getData() });
        this.onTextChange("terms_and_conditions", false);
    }

    /** On change */
    onTextChange = (key, value) => {
        RegisterSellerUser.setData({ [key]: value });
        this.setState({ [key]: value });
    }

    /** On submit */
    sumbit = () => {
        const { history, location } = this.props;
        const { screenType } = location.state;
        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        if (screenType === 'edit') {
            const { validMobileNumber, password, terms_and_conditions, confirm_password, ...rest } = RegisterSellerUser.getData();
            this.setState(() => ({ isLoading: true, errors: [] }), () => {
                Api.isValidForm(Object.keys(Object.assign({ ...rest }, { id, accessToken })), Object.assign({ ...rest }, { id, accessToken }))
                    .then(res => {
                        Socket.request(edit_seller_profile.emit, Object.assign({ ...rest }, { id, accessToken }));
                        if (res && res.message === "Success") {
                            this.getEditSellerResponse();
                        } else if (res && res.response) {
                            const { status, response } = res;
                            this.setState({ errors: response && response.length ? response : [] });
                        }
                    })
                    .catch(err => console.log('editSeller', err));
            });
        } else {
            const { validMobileNumber, confirm_password, ...rest } = RegisterSellerUser.getData();
            this.setState(() => ({ isLoading: true, errors: [] }), () => {
                Api.sellerSignup(Object.keys({ ...rest }), { ...rest })
                    .then(res => {
                        console.log(res);
                        if (res && res.message) {
                            this.setState({ isLoading: false });
                            if (res.message === "Success") {
                                history.push(routerNames.verification, { data: { ...rest } });
                            } else if (res.message === "Present") this.setAlertMessageVisible(true, { status: res.message, heading: "User is Present!", message: "Please try with another email id" }, '');
                            else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" }, '')
                        } else if (res && res.response) {
                            const { status, response } = res;
                            this.setState({ isLoading: false, errors: response && response.length ? response : [] });
                        }
                    })
                    .catch(err => console.log('editSeller', err));
            });
        }
    }

    /** Get response */
    getEditSellerResponse = () => {
        const { history } = this.props;

        UserApi.getSocketResponseOnce(edit_seller_profile.on, (res) => {
            this.setState({ isLoading: false });
            console.log('editSeller', JSON.stringify(res));
            if (res && res.data) {
                if (res.message === "Success") {
                    history.go(-4);
                } else if (res.message === "SuccessWithMobileChange") {
                    this.setAlertMessageVisible(true, { status: res.message, heading: "Verification Code Sent!", message: "Ishaanvi needs verification, you have to login again." }, res.message);
                } else if (res.message === "EmailPresent") this.setAlertMessageVisible(true, { status: res.message, heading: "Present!", message: "Email is present, please try with another email address." }, res.message);
                else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" }, '');
            } else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" }, '')
        });
    }

    /** On error */
    isError = (key) => {
        const { errors } = this.state;
        console.log(errors);

        if (errors && errors.length) {
            return errors.findIndex(ele => (ele.fieldName === key)) > -1 ? { status: true, message: errors[errors.findIndex(ele => (ele.fieldName === key))].message } : { status: false, message: "" };
        } else return { status: false, message: "" }
    }

    setAlertMessageVisible(alertMessageVisible, alertMessage, responseStatus) {
        this.setState({ alertMessageVisible, alertMessage, responseStatus });
    }

    async onSetAlertMessageVisible() {
        const { responseStatus } = this.state;

        if (responseStatus === "SuccessWithMobileChange") {
            const { history } = this.props;

            User.resetUserData();
            await UserData.removeItem(StorageKeys.USER_DATA);
            Helper.resetAndPushRoot(history, routerNames.selectUserAction);
            this.setState({ alertMessageVisible: false, alertMessage: {}, responseStatus: '' });
        } else this.setState({ alertMessageVisible: false, alertMessage: {}, responseStatus: '' });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history, location } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, isVisible, sellerRegisterForm, alertMessageVisible, alertMessage } = this.state;
        const { name, email, password, confirm_password, mobile_number, category, business_name, business_address } = sellerRegisterForm;
        const { screenType } = location.state;

        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <InfoCompleteHeader
                    index={3} />
                <AlertMessage
                    isVisible={alertMessageVisible}
                    data={alertMessage}
                    {...this.props}
                    setVisible={this.onSetAlertMessageVisible.bind(this)} />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'space-between' }, stretch]}>
                    <WView flex dial={5} padding={[10, 20]} style={[stretch]} >
                        <WView flex dial={2} style={[stretch]}>
                            <Section
                                label={"Category"} />
                            <WithInfo
                                label={"Category"}
                                value={category} />

                            <Section
                                label={"Buisness Name"} />
                            <WithInfo
                                label={"Name"}
                                value={business_name} />
                            <WithInfo
                                label={"Address"}
                                value={business_address} />

                            <Section
                                label={"Contact Info"} />
                            <WithInfo
                                label={"Name"}
                                value={name} />
                            <WithInfo
                                label={"Email"}
                                value={email} />
                            <WithInfo
                                label={"Mobile Number"}
                                value={mobile_number} />

                            {
                                screenType !== "edit" &&
                                <WRow dial={4} padding={[10, 0]}>
                                    <CheckBox
                                        onPress={value => this.onTextChange("terms_and_conditions", value)}
                                        isLoading={isLoading}
                                        isError={this.isError("terms_and_conditions")}
                                    />
                                    <WText padding={[0, 10]} fontSize={14}>I agree with <WText fontSize={14} color={Palette.theme_color}> Terms & Conditions</WText></WText>
                                </WRow>
                            }

                        </WView>

                        <Large
                            label="Submit"
                            style={{ marginTop: 10 }}
                            isLoading={isLoading}
                            onPress={this.sumbit.bind(this)}
                        />

                        <Large
                            label="Back"
                            style={{ marginTop: 5 }}
                            onPress={() => history.goBack()}
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
