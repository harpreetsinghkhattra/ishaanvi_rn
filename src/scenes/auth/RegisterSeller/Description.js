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

export default class Description extends Component {

    state = {
        isLoading: false,
        errors: [],
        isVisible: false,
        business_name: "",
        business_address: ""
    }

    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        const { business_address, business_name } = RegisterSellerUser.getData();

        this.setState({ business_address, business_name });
    }

    /** On change */
    onTextChange = (key, value) => {
        RegisterSellerUser.setData({ [key]: value });
        this.setState({ [key]: value });
    }

    /** On next */
    next = () => {
        const { history, location } = this.props;
        const { screenType } = location.state;

        const { business_address, business_name } = RegisterSellerUser.getData();
        console.log({ business_address, business_name });

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Api.isValidForm(["business_address", "business_name"], { business_address, business_name })
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

    /** Set visible */
    setVisible = (isVisible, business_address) => {
        if (business_address && typeof business_address === 'string') {
            this.onTextChange("business_address", business_address);
            this.setState({ isVisible, business_address });
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
        const { isLoading, isVisible, business_address, business_name } = this.state;

        console.log(this.props);
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
                        </WView>
                        <WRow dial={4} padding={[10, 0]} style={{ justifyContent: "space-between" }}>
                            <WithSeprateIcon
                                isLeftIcon={true}
                                onPress={() => history.goBack()}
                                label="BACK"
                            />
                            <WithSeprateIcon
                                iconPath={require("../../../images/right_arrow_btn.png")}
                                onPress={this.next.bind(this)}
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
