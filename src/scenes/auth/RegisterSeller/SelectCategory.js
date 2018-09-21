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

export default class SelectCategory extends Component {

    state = {
        isError: false
    }

    /** On next */
    next = () => {
        const { history } = this.props;
        if (RegisterSellerUser.getData().category) {
            history.push(routerNames.registerSellerDescription);
        } else this.setState({ isError: true });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { isLoading, isError } = this.state;

        const categoryWidth = (screenWidth - 70) / 2;

        console.log(this.props);
        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <InfoCompleteHeader
                    index={1} />
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
                                data={[
                                    { label: "Multi Brand's", imageSource: require("../../../images/muli_brands.png") },
                                    { label: "Garments", imageSource: require("../../../images/garments.png") },
                                    { label: "Boutiques", imageSource: require("../../../images/boutique.png") },
                                    { label: "Designers \n(men, woman)", imageSource: require("../../../images/designer.jpg") },
                                ]}
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
