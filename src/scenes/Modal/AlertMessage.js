import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner } from '../../components/common';
import { ScrollView, PixelRatio, Alert, Modal, FlatList, Image } from 'react-native';
import Palette from '../../Palette';
import { Large, WithSeprateIcon } from '../../components/UI/btn';
import { CheckBox } from '../../components/UI/checkbox';
import { routerNames } from '../../RouteConfig';
import { Api } from '../../api/Api';
import { InfoCompleteAutoSelect } from '../../components/Select/';
import { TextInputWithLabel } from '../../components/UI/input';
import { PlaceSearchHeader } from '../../components/Header';

export default class AutoComplete extends Component {

    state = {
        isLoading: false,
        locations: []
    }

    static propTypes = {
        setLocation: PropTypes.func
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history, isVisible, setVisible, setLocation } = this.props;
        const { stretch, btnStyle, btnContainer, border, circleView, image } = styles;
        const { locations, isLoading } = this.state;

        console.log(this.props);
        return (
            <Modal
                animationType="slide"
                visible={isVisible}
                onRequestClose={() => { }}
                transparent={true}>
                <WView dial={5} style={{ alignItems: 'stretch' }} backgroundColor={"rgba(255, 255, 255, 9"}>
                    <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'center', alignItems: 'stretch' }, stretch]}>
                        <WView dial={5} padding={[30, 20]} style={[stretch]} backgroundColor={Palette.white}>
                            <WView dial={5} style={[circleView]} backgroundColor={Palette.theme_color}>
                                <Image source={"../../images/check.png"} style={image} /> 
                            </WView>
                            <WText fontSize={18} padding={[5, 0]} center fontFamily={"Muli-Bold"}>Success</WText>
                            <WText padding={[0, 0, 5, 0]} center >Success</WText>
                            <WView padding={[0, 0, 0, 0]} dial={5} style={[stretch]} backgroundColor={Palette.theme_color}>
                                <Image source={require("../../images/down_caret.png")} style={[image, { position: "absolute", top: 0 }]} />
                                <WTouchable onPress={setVisible} margin={[30, 0]} backgroundColor={"green"}>
                                    <WText fontSize={14} center>Ok</WText>
                                </WTouchable>
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
        borderBottomWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.border_color
    },
    image: {
        width: 24,
        height: 24,
        tintColor: Palette.white
    },
    circleView: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
}
