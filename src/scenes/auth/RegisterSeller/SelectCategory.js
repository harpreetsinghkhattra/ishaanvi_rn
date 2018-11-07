import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../../components/common';
import { ScrollView, PixelRatio, Alert } from 'react-native';
import Palette from '../../../Palette';
import { Large, WithSeprateIcon } from '../../../components/UI/btn';
import { CheckBox } from '../../../components/UI/checkbox';
import { routerNames } from '../../../RouteConfig';
import { Api } from '../../../api/Api';
import { InfoCompleteAutoSelect, CategorySelect } from '../../../components/Select/';
import { TextInputWithLabel } from '../../../components/UI/input';
import { InfoCompleteHeader } from '../../../components/Header';
import { AutoComplete } from '../../Modal/';
import { RegisterSellerUser } from '../../../model/RegisterSellerUser';
import { User } from '../../../model/user';

export default class SelectCategory extends Component {

    state = {
        isError: false
    }

    constructor(props) {
        super(props);
        this.clearData = true;
    }

    componentDidMount = () => {
        this.init(); 
    }   

    componentWillUnmount() { 
        if (this.clearData) {
            RegisterSellerUser.resetData();
        }
    }


    init() {
        const { history, location } = this.props;
        const { screenType } = location.state;
        const { name, createdTime, business_address, business_name, deletedStatus, email, forgetPassword, mobile_number, status, termsAndConditions, updatedTime, userType, category } = User.getUserData();

        if (screenType === "edit") {
            RegisterSellerUser.setData({
                email,
                mobile_number,
                "terms_and_conditions": termsAndConditions,
                name,
                business_name,
                business_address,
                userType
            });
        }
    }

    /** On next */
    next = () => {
        const { history, location } = this.props;
        const { screenType } = location.state;

        if (RegisterSellerUser.getData().category) {
            this.clearData = false;
            history.push(routerNames.registerSellerDescription, { screenType });
        } else this.setState({ isError: true });
    }

    /** On back */
    onBack = () => {
        const { history, location } = this.props;
        if (location.state && location.state.screenType === "edit")
            history.replace(routerNames.index, { selectedIndex: 4 })
        else history.go(-1);
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, isError } = this.state;
        const { category } = User.getUserData();

        const categoryWidth = (screenWidth - 70) / 2;

        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <InfoCompleteHeader
                    index={0} />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'space-between' }, stretch]}>
                    <WView flex dial={5} padding={[0, 10]} style={[stretch]} >
                        <WView flex dial={2} style={[stretch]}>
                            <WText padding={[10, 5]} fontSize={14} fontFamily={"Muli-Bold"}>
                                Tell us something about you business
                            </WText>
                            <WText padding={[10, 5]} fontSize={14} fontFamily={"Muli-Bold"} color={isError ? Palette.red : Palette.border_color}>
                                Select a category *
                            </WText>

                            <CategorySelect
                                width={categoryWidth}
                                value={category}
                                data={[
                                    { label: "Multi Brand's", imageSource: require("../../../images/muli_brands.png") },
                                    { label: "Garments", imageSource: require("../../../images/garments.png") },
                                    { label: "Boutiques", imageSource: require("../../../images/boutique.png") },
                                    { label: "Designers \n(men, woman)", imageSource: require("../../../images/designer.jpg") },
                                    { label: "Cloth \nHouse/Shop", imageSource: require("../../../images/cloth_shop.jpg") },
                                ]}
                            />

                        </WView>
                        <WRow dial={4} padding={[10, 0]} style={{ justifyContent: "space-between" }}>
                            <WithSeprateIcon
                                isLeftIcon={true}
                                onPress={this.onBack.bind(this)}
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
