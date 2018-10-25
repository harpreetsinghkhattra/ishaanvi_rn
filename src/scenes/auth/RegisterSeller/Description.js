import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput, WSpinner } from '../../../components/common';
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

export default class Description extends Component {

    state = {
        isLoading: false,
        isLocationDetailLoading: false,
        errors: [],
        isVisible: false,
        business_name: "",
        business_address: "",
        address: ""
    }

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        const { business_address, business_name, address } = RegisterSellerUser.getData();

        this.setState({ business_address, business_name, address });
    }

    /** On change */
    onTextChange = (key, value) => {
        RegisterSellerUser.setData({ [key]: value });
        this.setState({ [key]: value });
    }

    /** On next */
    next = () => {
        const { history } = this.props;
        const { screenType } = this.props.location.state;

        const { business_address, business_name, address, location } = RegisterSellerUser.getData();
        console.log({ business_address, business_name, location });

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Api.isValidForm(["business_address", "business_name", "address", "location"], { business_address, business_name, address, location })
                .then(res => {
                    if (res && res.message === "Success") {
                        this.setState({ isLoading: false });
                        history.push(routerNames.registerSellerContactInfo, { screenType });
                    } else if (res && res.response) {
                        const { status, response } = res;
                        this.setState({ isLoading: false, errors: response && response.length ? response : [] });
                    }
                })
                .catch(err => console.log(err));
        });
    }

    /** Get location detail */
    getLocationDetail = () => {
        const { business_address } = this.state;
        this.setState({ isLocationDetailLoading: true });
        Api.getLocationDetail(["address"], { address: business_address })
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

    /** Set visible */
    setVisible = (isVisible, business_address) => {
        if (business_address && typeof business_address === 'string') {
            this.onTextChange("business_address", business_address);
            this.setState(() => ({ isVisible, business_address }), () => this.getLocationDetail());
        } else this.setState({ isVisible })
    }

    /** On error */
    isError = (key) => {
        const { errors } = this.state;
        console.log("errors", errors);

        if (errors && errors.length) {
            return errors.findIndex(ele => (ele.fieldName === key)) > -1 ? { status: true, message: errors[errors.findIndex(ele => (ele.fieldName === key))].message } : { status: false, message: "" };
        } else return { status: false, message: "" }
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, isVisible, business_address, business_name, address, isLocationDetailLoading } = this.state;

        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <InfoCompleteHeader
                    index={1} />
                <AutoComplete
                    isVisible={isVisible}
                    setVisible={this.setVisible.bind(this)}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'space-between' }, stretch]}>
                    <WView flex dial={5} padding={[0, 20]} style={[stretch]} >
                        <WView flex dial={2} style={[stretch]}>
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Name of Your Business *"
                                placeholderName={"Mohit Garments"}
                                isLoading={isLoading}
                                isError={this.isError("business_name")}
                                iconPath={require("../../../images/business.png")}
                                onChangeText={value => this.onTextChange("business_name", value)}
                                getFocus={ref => this.input1 = ref}
                                value={business_name}
                                onSubmitEditing={() => this.input2 && this.input2.focus()}
                            />
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label={"Location *"}
                                placeholderName={"Mohali Punjab, India"}
                                isError={this.isError("business_address")}
                                isLoading={isLoading}
                                keyboardType={"default"}
                                onChangeText={this.setVisible.bind(this, true)}
                                onFocus={this.setVisible.bind(this, true)}
                                getFocus={ref => this.input2 = ref}
                                iconPath={require("../../../images/location.png")}
                                value={business_address}
                                onSubmitEditing={() => this.input3 && this.input3.focus()}
                            />
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label={"Address *"}
                                placeholderName={"Mohali Punjab, India"}
                                isError={this.isError("address")}
                                isLoading={isLoading}
                                keyboardType={"default"}
                                onChangeText={value => this.onTextChange("address", value)}
                                getFocus={ref => this.input3 = ref}
                                iconPath={require("../../../images/location.png")}
                                value={address}
                                onSubmitEditing={() => { }}
                            />
                        </WView>
                        {
                            isLocationDetailLoading ?
                                <WView dial={5} padding={[5, 5]}>
                                    <WSpinner size={"small"} color={Palette.theme_color} />
                                    <WText fontFamily={"Muli-Bold"}>Please wait...</WText>
                                </WView>
                                : null
                        }
                        <WRow dial={4} padding={[10, 0]} style={{ justifyContent: "space-between" }}>
                            <WithSeprateIcon
                                isLeftIcon={true}
                                onPress={(isLocationDetailLoading) ? () => { } : () => history.goBack()} 
                                label="BACK"
                            />
                            <WithSeprateIcon
                                iconPath={require("../../../images/right_arrow_btn.png")}
                                onPress={(isLocationDetailLoading) ? () => { } : this.next.bind(this)}
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
