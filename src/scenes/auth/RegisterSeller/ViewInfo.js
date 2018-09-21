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
import { Section, WithInfo } from '../../../components/Label';

export default class ContactInfo extends Component {

    state = {
        isLoading: false,
        errors: [],
        sellerRegisterForm: {}
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
        const { history } = this.props;
        const { validMobileNumber, confirm_password, ...rest } = RegisterSellerUser.getData();

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Api.sellerSignup(Object.keys({ ...rest }), { ...rest })
                .then(res => {
                    console.log(res);
                    if (res && res.message) {
                        this.setState({ isLoading: false });
                        if (res.message === "Success") {
                            history.push(routerNames.verification, {data: {...rest}});
                        } else Alert.alert("", res.message);
                    } else if (res && res.response) {
                        const { status, response } = res;
                        this.setState({ isLoading: false, errors: response && response.length ? response : [] });
                    }
                })
                .catch(err => console.log(err));
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

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, isVisible, sellerRegisterForm } = this.state;
        const { name, email, password, confirm_password, mobile_number, category, business_name, business_address } = sellerRegisterForm;

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <InfoCompleteHeader
                    index={3} />
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

                            <WRow dial={4} padding={[10, 0]}>
                                <CheckBox
                                    onPress={value => this.onTextChange("terms_and_conditions", value)}
                                    isLoading={isLoading}
                                    isError={this.isError("terms_and_conditions")}
                                />
                                <WText padding={[0, 10]} fontSize={14}>I agree with <WText fontSize={14} color={Palette.theme_color}> Terms & Conditions</WText></WText>
                            </WRow>

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
