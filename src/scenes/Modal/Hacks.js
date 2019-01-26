import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner } from '../../components/common';
import { ScrollView, PixelRatio, Alert, Modal, FlatList, Image, StyleSheet } from 'react-native';
import Palette from '../../Palette';
import { Large, WithSeprateIcon } from '../../components/UI/btn';
import { CheckBox } from '../../components/UI/checkbox';
import { routerNames } from '../../RouteConfig';
import { InfoCompleteAutoSelect } from '../../components/Select/';
import { MultiTextInputWithLabel } from '../../components/UI/input';
import { PlaceSearchHeader } from '../../components/Header';
import { Api, Socket, User as UserApi } from '../../api';
import { submitRating } from '../../api/SocketUrls';
import { User } from '../../model/user';
import ImageRN from '../../components/common/Image';

export default class Hacks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }

        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _setState = (value, cb) => {
        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    static propTypes = {
        data: PropTypes.object
    }

    init = () => {
        this._setState({
            isLoading: false
        });
    }

    _renderButton = () => {
        const { setVisible } = this.props;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage } = styles;

        return (
            <WTouchable dial={5} onPress={setVisible} style={[btnStyle]} margin={[30, 0]} backgroundColor={"green"}>
                <WText fontSize={14} padding={[0, 60]} color={Palette.white} fontFamily={"Muli-Bold"} center>OK</WText>
            </WTouchable>
        );
    }

    render() {
        const { screenWidth, screenHeight, screenHeightWithHeader, history, isVisible, setVisible, data } = this.props;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage } = styles;
        const { isRating } = this.state;

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
                                <Image source={require("../../images/speaker.png")} style={[image]} />  
                            </WView>
                            <ImageRN
                                source={require("../../images/comming_soon.png")}
                                style={{ width: screenWidth }}
                            />
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
    },
    iconStyle: {
        width: 20,
        height: 20
    }
}
