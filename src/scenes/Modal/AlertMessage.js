import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner } from '../../components/common';
import { ScrollView, PixelRatio, Alert, Modal, FlatList, Image, StyleSheet } from 'react-native';
import Palette from '../../Palette';
import { Large, WithSeprateIcon } from '../../components/UI/btn';  
import { CheckBox } from '../../components/UI/checkbox';
import { routerNames } from '../../RouteConfig';
import { Api } from '../../api/Api';
import { InfoCompleteAutoSelect } from '../../components/Select/';
import { TextInputWithLabel } from '../../components/UI/input';
import { PlaceSearchHeader } from '../../components/Header';

export default class AlertMessage extends Component {

    state = {
        message: {}
    }

    static propTypes = {
        data: PropTypes.object
    }

    _selectIcon() {
        const { data } = this.props;
        const { status, heading, message } = data;

        switch (status) {
            case "Success":
                return (require("../../images/check.png"));
            case "logout":
                return (require("../../images/logout.png"));
            default:
                return (require("../../images/error.png"));
        }
    }

    _renderButton = () => {
        const { isVisible, setVisible, data, onAccept, onDecline, label1, label2 } = this.props;
        const { status, heading, message } = data;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage } = styles;

        if (status === "logout") {
            return (
                <WRow dial={5} style={[stretch]}>
                    <WTouchable dial={5} onPress={onAccept} style={[btnStyle]} margin={[30, 10, 0, 0]} backgroundColor={"green"}>
                        <WText fontSize={14} padding={[0, 60]} color={Palette.white} fontFamily={"Muli-Bold"} center>{label1}</WText>
                    </WTouchable>
                    <WTouchable dial={5} onPress={onDecline} style={[btnStyle]} margin={[30, 0]} backgroundColor={"green"}>
                        <WText fontSize={14} padding={[0, 60]} color={Palette.white} fontFamily={"Muli-Bold"} center>{label2}</WText>
                    </WTouchable>
                </WRow>
            );
        } else return (
            <WTouchable dial={5} onPress={setVisible} style={[btnStyle]} margin={[30, 0]} backgroundColor={"green"}>
                <WText fontSize={14} padding={[0, 60]} color={Palette.white} fontFamily={"Muli-Bold"} center>OK</WText>
            </WTouchable>
        );
    }

    render() {
        const { screenWidth, screenHeight, screenHeightWithHeader, history, isVisible, setVisible, data } = this.props;
        const { status, heading, message } = data;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage } = styles;
        const icon = this._selectIcon();

        return (
            <Modal
                animationType="fade"
                visible={isVisible}
                onRequestClose={() => { }}
                transparent={true}>
                <WView dial={5} style={{ alignItems: 'stretch' }}>
                    <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeight, justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.7)" }, stretch]}>
                        <WView dial={5} padding={[10, 0, 0, 0]} style={[stretch]} backgroundColor={Palette.white}> 
                            <WView dial={5} style={[circleView, { alignSelf: 'center' }]} backgroundColor={Palette.theme_color}>
                                <Image source={icon} style={[image]} />
                            </WView>
                            <WText fontSize={18} padding={[5, 0, 0, 0]} center fontFamily={"Muli-Bold"}>{heading}</WText>
                            <WText padding={[0, 5, 5, 5]} center color={Palette.border_color} lines={2}>{message}</WText>
                            <WView flex dial={5} backgroundColor={Palette.theme_color}>
                                <Image source={require("../../images/down_caret.png")} style={[image, caretImage]} />
                                {this._renderButton()}
                            </WView>
                        </WView>
                    </ScrollView>
                </WView >
            </Modal>
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch',
    },
    btnStyle: {
        borderColor: "#F7F7F7",
        borderWidth: StyleSheet.hairlineWidth * 2,
        height: 40,
        borderRadius: 5
    },
    border: {
        borderStyle: "solid",
        borderBottomWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.border_color
    },
    image: {
        width: 24,
        height: 24,
        tintColor: Palette.white,
    },
    circleView: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    caretImage: {
        position: 'absolute',
        top: -10
    }
}
