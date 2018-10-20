import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../../components/common';
import { ScrollView, PixelRatio, Alert } from 'react-native';
import Palette from '../../../Palette';
import { Large, WithSeprateIcon } from '../../../components/UI/btn';
import { CheckBox } from '../../../components/UI/checkbox';
import { routerNames } from '../../../RouteConfig';
import { Api } from '../../../api/Api';
import { InfoCompleteAutoSelect } from '../../../components/Select/';
import { TextInputWithLabel } from '../../../components/UI/input';
import { InfoCompleteHeader } from '../../../components/Header';
import { AutoComplete } from '../../Modal/';
import { RegisterSellerUser } from '../../../model/RegisterSellerUser';

export default class ContactInfo extends Component {

    state = {
        isLoading: false,
        errors: [],
        isVisible: false,
        name: "",
        email: "",
        password: "",
        mobile_number: "",
        confirm_password: "",
        loadingValidNumber: false
    }

    componentWillMount = () => {
        const { business_address, business_name, category, ...rest } = RegisterSellerUser.getData();
        this.setState({ ...rest });
    }


    /** On change */
    onTextChange = (key, value) => {
        RegisterSellerUser.setData({ [key]: value });
        this.setState({ [key]: value });

        // switch (key) {
        //     case "mobile_number":
        //         if (value && value.length >= 10) {
        //             var mob_number = value.length > 10 ? value.substr(value.length - 10, value.length) : value;
        //             this.submitNumber(mob_number);
        //         }
        //         break;
        // }
    }

    /** Is valid mobile number */
    submitNumber = (mobile_number) => {

        this.setState(() => ({ loadingValidNumber: true, errors: [] }), () => {
            Api.isValidMobileNumber(Object.keys({ mobile_number }), { mobile_number })
                .then(res => {
                    console.log(res);
                    if (res && res.message) {
                        if (res.message === "Success" && res.data.status === 0) {
                            this.onTextChange("validMobileNumber", 0);
                            this.setState({ loadingValidNumber: false, errors: [] });
                        } else {
                            this.onTextChange("validMobileNumber", 1);
                            this.setState({ loadingValidNumber: false, errors: [{ fieldName: "mobile_number", message: "Entered number is not valid, please try again" }] });
                        }
                    } else if (res && res.response) {
                        const { status, response } = res;
                        this.setState({ loadingValidNumber: false, errors: response && response.length ? response : [] });
                    }
                })
                .catch(err => console.log(err));
        });
    }

    /** On submit */
    sumbit = () => {
        const { history, location } = this.props;
        const { screenType } = location.state;

        console.log('editSeller', RegisterSellerUser.getData());

        if (screenType === "edit") {
            const { terms_and_conditions, validMobileNumber, password, confirm_password, ...rest } = RegisterSellerUser.getData();

            validMobileNumber === 0 &&
                this.setState(() => ({ isLoading: true, errors: [] }), () => {
                    Api.isValidForm(Object.keys({ ...rest }), { ...rest })
                        .then(res => {
                            if (res && res.message) {
                                this.setState({ isLoading: false });
                                if (res.message === "Success") {
                                    history.push(routerNames.registerSellerViewInfo, { screenType });
                                } else Alert.alert("", res.message);
                            } else if (res && res.response) {
                                const { status, response } = res;
                                this.setState({ isLoading: false, errors: response && response.length ? response : [] });
                            }
                        })
                        .catch(err => console.log(err));
                });
        } else {
            const { terms_and_conditions, validMobileNumber, password, confirm_password, ...rest } = RegisterSellerUser.getData();

            validMobileNumber === 0 &&
                this.setState(() => ({ isLoading: true, errors: [] }), () => {
                    Api.isValidForm(Object.keys({ ...rest }), { ...rest })
                        .then(res => {
                            if (res && res.message) {
                                this.setState({ isLoading: false });
                                if (res.message === "Success") {
                                    history.push(routerNames.registerSellerViewInfo, { screenType });
                                } else Alert.alert("", res.message);
                            } else if (res && res.response) {
                                const { status, response } = res;
                                console.log('editSeller', res);
                                this.setState({ isLoading: false, errors: response && response.length ? response : [] });
                            }
                        })
                        .catch(err => console.log(err));
                });
        }
    }

    /** On error */
    isError = (key) => {
        const { errors } = this.state;
        console.log(errors);

        if (errors && errors.length) {
            return errors.findIndex(ele => (ele.fieldName === key)) > -1 ? { status: true, message: errors[errors.findIndex(ele => (ele.fieldName === key))].message } : { status: false, message: "" };
        } else return { status: false, message: "" }
    }

    /** Set visible */
    setVisible = (isVisible) => {
        this.setState({ isVisible });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history, location } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, isVisible, name, email, password, confirm_password, mobile_number, loadingValidNumber } = this.state;
        const { screenType } = location.state;
        const isPassword = screenType === 'edit' ? true : false;

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <InfoCompleteHeader
                    index={2} />
                <AutoComplete
                    isVisible={isVisible}
                    setVisible={this.setVisible.bind(this, false)}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'space-between' }, stretch]}>
                    <WView flex dial={5} padding={[0, 20]} style={[stretch]} >
                        <WView flex dial={2} style={[stretch]}>
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Name *"
                                placeholderName={"e.g. Mohit"}
                                isLoading={isLoading}
                                isError={this.isError("name")}
                                iconPath={require("../../../images/user1.png")}
                                value={name}
                                onChangeText={value => this.onTextChange("name", value)}
                                getFocus={ref => this.input1 = ref}
                                onSubmitEditing={() => this.input2 && this.input2.focus()}
                            />

                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Email *"
                                placeholderName={"e.g. mohit@example.com"}
                                isLoading={isLoading}
                                isError={this.isError("email")}
                                iconPath={require("../../../images/via_email.png")}
                                value={email}
                                onChangeText={value => this.onTextChange("email", value)}
                                getFocus={ref => this.input2 = ref}
                                onSubmitEditing={() => this.input3 && this.input3.focus()}
                            />

                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Phone Number *"
                                placeholderName={"e.g. 9999999999"}
                                isLoading={isLoading}
                                keyboardType="numeric"
                                isLoadingValidNumber={loadingValidNumber}
                                value={mobile_number}
                                isError={this.isError("mobile_number")}
                                iconPath={require("../../../images/mobile_phone.png")}
                                onChangeText={value => this.onTextChange("mobile_number", value)}
                                getFocus={ref => this.input3 = ref}
                                onSubmitEditing={() => this.input4 && this.input4.focus()}
                            />

                            {
                                !isPassword &&
                                <TextInputWithLabel
                                    margin={[10, 0]}
                                    label={"Password (at least 5 characters) *"}
                                    placeholderName={"e.g. ******"}
                                    isError={this.isError("password")}
                                    isLoading={isLoading}
                                    value={password}
                                    onChangeText={value => this.onTextChange("password", value)}
                                    iconPath={require("../../../images/lock.png")}
                                    secureTextEntry={true}
                                    getFocus={ref => this.input4 = ref}
                                    onSubmitEditing={() => this.input5 && this.input5.focus()}
                                />
                            }

                            {
                                !isPassword &&
                                <TextInputWithLabel
                                    margin={[10, 0]}
                                    label={"Confirm Password *"}
                                    value={confirm_password}
                                    placeholderName={"e.g. ******"}
                                    isError={this.isError("confirm_password")}
                                    onChangeText={value => this.onTextChange("confirm_password", value)}
                                    isLoading={isLoading}
                                    secureTextEntry={true}
                                    iconPath={require("../../../images/lock.png")}
                                    getFocus={ref => this.input5 = ref}
                                    onSubmitEditing={this.sumbit.bind(this)}
                                />
                            }
                        </WView>
                        <WRow dial={4} padding={[10, 0]} style={{ justifyContent: "space-between" }}>
                            <WithSeprateIcon
                                isLeftIcon={true}
                                onPress={() => history.goBack()}
                                label="BACK"
                            />
                            <WithSeprateIcon
                                iconPath={require("../../../images/right_arrow_btn.png")}
                                onPress={this.sumbit.bind(this)}
                                isRightIcon={true}
                                label="NEXT"
                            />
                        </WRow>
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
