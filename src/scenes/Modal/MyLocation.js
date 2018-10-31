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

export default class MyLocation extends Component {

    state = {
        message: {}
    }

    static propTypes = {
        data: PropTypes.object
    }

    _renderButton = () => {
        const { isVisible, setVisible, data, onAccept, onDecline, label1, label2 } = this.props;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage } = styles;

        return (
            <WTouchable dial={5} onPress={setVisible} style={[btnStyle]} margin={[30, 0]} backgroundColor={"green"}>
                <WText fontSize={14} padding={[0, 60]} color={Palette.white} fontFamily={"Muli-Bold"} center>Send</WText>
            </WTouchable>
        );
    }

    render() {
        const { screenWidth, screenHeight, screenHeightWithHeader, history, isVisible, setVisible, data } = this.props;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage, textInputContainerStyle, iconStyle } = styles;
        const icon = require('../../images/location.png');
        const send = require('../../images/send.png');

        return (
            <Modal
                animationType="fade"
                visible={isVisible}
                onRequestClose={() => { }}
                transparent={true}>
                <WView dial={8} flex style={{ minWidth: screenWidth, minHeight: screenHeight, backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                    <WView dial={8} style={[stretch, { position: 'absolute', bottom: 0 }]}>
                        <WRow dial={6} style={[stretch]}>
                            <WText fontSize={16} padding={[10, 10]} fontFamily={"Muli-Bold"} color={Palette.white} right>Done</WText>
                        </WRow>
                        <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: 200, backgroundColor: 'green', alignItems: 'flex-end', justifyContent: 'flex-end' }, stretch]}>
                            <WView dial={8} padding={[10, 10]} style={[stretch]} backgroundColor={Palette.white}>
                                <WText padding={[0, 5, 5, 5]} center lines={2} fontSize={12} color={Palette.border_color} lines={2}>
                                    Ishaanvi wants a destination to show relevant collections
                            </WText>

                                <WTouchable dial={5} style={btnContainer} >
                                    <WRow dial={5}>
                                        <Image source={send} style={iconStyle} />
                                        <WView padding={[0, 5]} dial={4} flex>
                                            <WText fontSize={14} fontFamily={"Muli-Bold"}>USE CURRENT LOCATION</WText>
                                        </WView>
                                    </WRow>
                                </WTouchable>
                                <WText padding={[10, 10]} center>Or</WText>
                                <WTextInput
                                    flex={1}
                                    containerStyle={textInputContainerStyle}
                                    placeholderName="Enter Zip code"
                                    style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold' }}
                                    iconTintColor={Palette.border_color}
                                    iconPath={require("../../images/search.png")}
                                    onSubmitEditing={() => { }}
                                />
                                <Large
                                    label={"SEND"}
                                    style={{ marginTop: 10 }}
                                />
                            </WView>
                        </ScrollView>
                    </WView>
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
    },
    textInputContainerStyle: {
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 0,
        alignItems: 'center',
        backgroundColor: Palette.white,
        borderColor: Palette.line_color,
        borderWidth: (1.5 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderStyle: 'solid',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    btnContainer: {
        borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.line_color,
        borderStyle: 'solid',
        backgroundColor: Palette.white,
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: Palette.text_color
    }
}
