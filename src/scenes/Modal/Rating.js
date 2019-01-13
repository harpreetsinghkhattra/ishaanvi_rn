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

export default class Rating extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isRating: true,
            ratingValue: 0,
            response: {
                status: "",
                message: ""
            }
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
            isLoading: false,
            isRating: true,
            ratingValue: 0,
            response: {
                status: "",
                message: ""
            }
        });
    }

    _selectIcon() {
        const { data } = this.props;
        const { image } = data;
        const { isRating, response } = this.state;
        const { status } = response;

        if (isRating) return image ? { uri: image } : require("../../images/product-dummy.png");

        switch (status) {
            case "Success":
                return (require("../../images/check.png"));
            default:
                return (require("../../images/error.png"));
        }
    }

    onAccept = () => {
        const { isVisible, setVisible, data, onDecline, label1, label2 } = this.props;
        this._setState({ response: { message: "Accepted", status: "Success" }, isRating: false });
    }

    _renderButton = () => {
        const { isVisible, setVisible, data, onDecline, label1, label2 } = this.props;
        const { isRating } = this.state;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage } = styles;

        if (isRating) {
            return (
                <WRow dial={5} margin={[0, 10]} style={[stretch]}>
                    <WTouchable dial={5} onPress={setVisible} style={[btnStyle]} margin={[30, 10, 0, 0]} backgroundColor={"green"}>
                        <WText fontSize={14} padding={[0, 60]} color={Palette.white} fontFamily={"Muli-Bold"} center>Cancel</WText>
                    </WTouchable>
                    <WTouchable dial={5} onPress={this.onAccept.bind(this)} style={[btnStyle]} margin={[30, 0]} backgroundColor={"green"}>
                        <WText fontSize={14} padding={[0, 60]} color={Palette.white} fontFamily={"Muli-Bold"} center>Send</WText>
                    </WTouchable>
                </WRow>
            );
        } else return (
            <WTouchable dial={5} onPress={setVisible} style={[btnStyle]} margin={[30, 0]} backgroundColor={"green"}>
                <WText fontSize={14} padding={[0, 60]} color={Palette.white} fontFamily={"Muli-Bold"} center>OK</WText>
            </WTouchable>
        );
    }

    RatingBtn = ({ onPress, iconPath }) =>
        <WTouchable dial={5} onPress={onPress} margin={[10, 3]} padding={[2, 2]}>
            <Image source={iconPath} style={styles.iconStyle} />
        </WTouchable>

    _starIcon = (index) => {
        const { ratingValue } = this.state;
        const value = ratingValue - index;

        if (value >= 0) return require('../../images/filled_star.png');
        else if (value === -0.5) return require('../../images/half_filled_star.png');
        else if (value < 0) return require('../../images/unfilled_star.png');
    }

    _setRatingValue = (value) => {
        this._setState(prevState => {
            const tempValue = value - prevState.ratingValue;

            if (tempValue === 0) return ({ ratingValue: value - 0.5 });
            else if (tempValue === 0.5) return ({ ratingValue: value - 1 });
            else if (tempValue > 0 || tempValue < 0) return ({ ratingValue: value });
        });
    }

    _renderRating = () => {
        const { data } = this.props;
        const { name } = data;
        const { ratingValue } = this.state;
        const star = [1, 2, 3, 4, 5];

        return (
            <WView dial={5}>
                <WText fontSize={16} fontFamily={"Muli-Bold"} color={Palette.theme_color}>Rate Us: {ratingValue}</WText>
                <WRow dial={5}>
                    {
                        star.map(ele =>
                            <this.RatingBtn
                                iconPath={this._starIcon(ele)}
                                onPress={this._setRatingValue.bind(this, ele)} />)
                    }
                </WRow>
            </WView>
        );
    }

    _renderData = () => {
        const { response } = this.state;
        const { message, status } = response;

        return (
            <WView dial={5}>
                <WText fontSize={18} padding={[5, 0, 0, 0]} center fontFamily={"Muli-Bold"}>{status}</WText>
                <WText padding={[0, 5, 5, 5]} center color={Palette.border_color} lines={2}>{message}</WText>
            </WView>
        );
    }

    render() {
        const { screenWidth, screenHeight, screenHeightWithHeader, history, isVisible, setVisible, data } = this.props;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage } = styles;
        const icon = this._selectIcon();
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
                                <Image source={icon} style={[isRating ? { width: 60, height: 60, borderRadius: 30 } : image]} />
                            </WView>
                            {
                                isRating ? this._renderRating() : this._renderData()
                            }
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
