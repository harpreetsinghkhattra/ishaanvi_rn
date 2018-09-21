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
import { VerificationData } from '../../../model/VerificationData';
import { Section, WithInfo } from '../../../components/Label';

export default class Verification extends Component {

    state = {
        isLoading: false,
        errors: []
    }

    componentDidMount = () => {
        this.onFocus();
        console.log(this.props);
    }

    /** On change */
    onTextChange = (key, value) => {
        VerificationData.setData({ [key]: value });
        this.onFocus();
    }

    /** Focus if empty */
    onFocus() {
        const Verification = VerificationData.getData();

        switch ('pin1') {
            case "pin1":
                if (Verification && !Verification["pin1"]) {
                    this.input1 && this.input1.focus();
                    break;
                }
            case "pin2":
                if (Verification && !Verification["pin2"]) {
                    this.input2 && this.input2.focus();
                    break;
                }
            case "pin3":
                if (Verification && !Verification["pin3"]) {
                    this.input3 && this.input3.focus();
                    break;
                }
            case "pin4":
                if (Verification && !Verification["pin4"]) {
                    this.input4 && this.input4.focus();
                    break;
                }
            case "pin5":
                if (Verification && !Verification["pin5"]) {
                    this.input5 && this.input5.focus();
                    break;
                }
            case "pin6":
                if (Verification && !Verification["pin6"]) {
                    this.input6 && this.input6.focus();
                    break;
                }
        }
    }

    /** On submit */
    sumbit = () => {
        const { history, location } = this.props;
        const { state } = location;
        const VerificationForm = VerificationData.getData();

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Api.verification(Object.keys(VerificationForm), Object.assign(VerificationForm, { email: state.data.email }))
                .then(res => {
                    console.log("verification res", res);
                    if (res && res.message) {      
                        this.setState({ isLoading: false });
                        if (res.message === "Success") {
                            history.push(routerNames.index);
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
            return errors.findIndex(ele => (ele.fieldName === key)) > -1 ? { status: true, message: "" } : { status: false, message: "" };
        } else return { status: false, message: "" }
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, isVisible } = this.state;

        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'space-between' }, stretch]}>
                    <WView flex dial={5} padding={[10, 20]} style={[stretch]} >
                        <WView flex dial={5} style={[stretch]}>
                            <WText fontSize={16} fontFamily={'Muli-Bold'} center>Verification</WText>
                            <WText fontFamily={'Muli'} center color={Palette.border_color}>Please enter your OTP below *</WText>
                            <WRow dial={5} padding={[10, 0]}>
                                <WTextInput
                                    margin={[10, 5]}
                                    placeholderName={""}
                                    isLoading={isLoading}
                                    containerStyle={{ width: 30 }}
                                    style={{ textAlign: 'center' }}
                                    keyboardType={"numeric"}
                                    maxLength={1}
                                    isError={this.isError("pin1")}
                                    onChangeText={value => this.onTextChange("pin1", value)}
                                    getFocus={ref => this.input1 = ref}
                                    onSubmitEditing={() => this.input2 && this.input2.focus()}
                                />
                                <WTextInput
                                    margin={[10, 5]}
                                    placeholderName={""}
                                    isLoading={isLoading}
                                    containerStyle={{ width: 30 }}
                                    style={{ textAlign: 'center' }}
                                    maxLength={1}
                                    keyboardType={"numeric"}
                                    isError={this.isError("pin2")}
                                    onChangeText={value => this.onTextChange("pin2", value)}
                                    getFocus={ref => this.input2 = ref}
                                    onSubmitEditing={() => this.input3 && this.input3.focus()}
                                />
                                <WTextInput
                                    margin={[10, 5]}
                                    placeholderName={""}
                                    isLoading={isLoading}
                                    containerStyle={{ width: 30 }}
                                    maxLength={1}
                                    style={{ textAlign: 'center' }}
                                    keyboardType={"numeric"}
                                    isError={this.isError("pin3")}
                                    onChangeText={value => this.onTextChange("pin3", value)}
                                    getFocus={ref => this.input3 = ref}
                                    onSubmitEditing={() => this.input4 && this.input4.focus()}
                                />
                                <WTextInput
                                    margin={[10, 5]}
                                    placeholderName={""}
                                    isLoading={isLoading}
                                    containerStyle={{ width: 30 }}
                                    maxLength={1}
                                    style={{ textAlign: 'center' }}
                                    keyboardType={"numeric"}
                                    isError={this.isError("pin4")}
                                    onChangeText={value => this.onTextChange("pin4", value)}
                                    getFocus={ref => this.input4 = ref}
                                    onSubmitEditing={() => this.input5 && this.input5.focus()}
                                />
                                <WTextInput
                                    margin={[10, 5]}
                                    placeholderName={""}
                                    isLoading={isLoading}
                                    maxLength={1}
                                    containerStyle={{ width: 30 }}
                                    style={{ textAlign: 'center' }}
                                    keyboardType={"numeric"}
                                    isError={this.isError("pin5")}
                                    onChangeText={value => this.onTextChange("pin5", value)}
                                    getFocus={ref => this.input5 = ref}
                                    onSubmitEditing={() => this.input6 && this.input6.focus()}
                                />
                                <WTextInput
                                    margin={[10, 5]}
                                    placeholderName={""}
                                    isLoading={isLoading}
                                    maxLength={1}
                                    containerStyle={{ width: 30 }}
                                    style={{ textAlign: 'center' }}
                                    keyboardType={"numeric"}
                                    isError={this.isError("pin6")}
                                    onChangeText={value => this.onTextChange("pin6", value)}
                                    getFocus={ref => this.input6 = ref}
                                    onSubmitEditing={() => this.input2 && this.input2.focus()}
                                />
                            </WRow>
                        </WView>
                        <Large
                            label="Submit"
                            style={{ marginTop: 10 }}
                            isLoading={isLoading}
                            onPress={this.sumbit.bind(this)}
                        />

                        <Large
                            label="Resend OTP"
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
