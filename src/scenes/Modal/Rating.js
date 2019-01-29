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

export default class Rating extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isRating: true,
            ratingValue: 0,
            review: "",
            errors: [],
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
            review: "",
            errors: [],
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

    sendRating = () => {
        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();
        const { isLoading, ratingValue, review } = this.state;
        const { data, setVisible } = this.props

        if (isLoading) return;

        this._setState({ isLoading: true, response: { message: "", status: "" } })
        Socket.request(submitRating.emit, {
            id,
            accessToken,
            userId: id,
            rating: `${ratingValue}`,
            review,
            productId: data.id,

        });

        UserApi.getSocketResponseOnce(submitRating.on, (res) => {
            console.log("VIEW PRODUCT DATA ===> ", res);

            if (res && res.message === "Success") {
                this._setState({ isLoading: false, response: { message: "Thanks to Rate Us.", status: "Success" }, isRating: false })
            } else this._setState({ isLoading: false, response: { message: "Something Went Wrong, Please Try Again.", status: "Error" }, isRating: false });
        });
    }

    /** On submit */
    submit = (btnStatus) => {
        const { setVisible } = this.props;
        const { review, ratingValue } = this.state;

        Api.isValidForm(Object.keys({ review }), { review })
            .then(res => {
                if (res && res.message) {
                    if (res.message === "Success") {
                        this.sendRating();
                    } else Alert.alert("", res.message);
                } else if (res && res.response) {
                    const { status, response } = res;
                    this.setState({ isLoading: false, errors: response && response.length ? response : [] });
                }
            })
            .catch(err => console.log(err));
    }

    /** On change */
    onTextChange = (key, value) => {
        this._setState({ [key]: value })
    }

    /** On error */
    isError = (key) => {
        const { errors } = this.state;
        console.log(errors);

        if (errors && errors.length) {
            return errors.findIndex(ele => (ele.fieldName === key)) > -1 ? { status: true, message: errors[errors.findIndex(ele => (ele.fieldName === key))].message } : { status: false, message: "" };
        } else return { status: false, message: "" }
    }

    // onAccept = () => {
    //     const { isVisible, setVisible, data, onDecline, label1, label2 } = this.props;
    //     this._setState({ response: { message: "Accepted", status: "Success" }, isRating: false });
    // }

    _renderButton = () => {
        const { isVisible, setVisible, data, onDecline, label1, label2 } = this.props;
        const { isRating, isLoading } = this.state;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage } = styles;

        if (isRating) {
            return (
                <WRow dial={5} style={[stretch]}>
                    <WTouchable dial={5} flex onPress={setVisible} style={[btnStyle]} margin={[30, 5]} backgroundColor={"green"}>
                        <WText fontSize={14} padding={[0, 30]} color={Palette.white} fontFamily={"Muli-Bold"} center>Cancel</WText>
                    </WTouchable>
                    <WTouchable dial={5} flex onPress={isLoading ? () => { } : this.submit.bind(this)} style={[btnStyle]} margin={[30, 5]} backgroundColor={"green"}>
                        {
                            isLoading ?
                                <WSpinner color={Palette.white} size={"small"} />
                                :
                                <WText fontSize={14} padding={[0, 30]} color={Palette.white} fontFamily={"Muli-Bold"} center>Send</WText>
                        }
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
        const { ratingValue, review } = this.state;
        const star = [1, 2, 3, 4, 5];
        const { stretch } = styles;

        return (
            <WView dial={5} style={[stretch]} margin={[0, 20]}>
                <WText fontSize={16} fontFamily={"Muli-Bold"} color={Palette.theme_color} center>Rate Us: {ratingValue}</WText>
                <WRow dial={5}>
                    {
                        star.map((ele, index) =>
                            <this.RatingBtn
                                key={`star-${index}`}
                                iconPath={this._starIcon(ele)}
                                onPress={this._setRatingValue.bind(this, ele)} />)
                    }
                </WRow>
                <MultiTextInputWithLabel
                    margin={[10, 0]}
                    label="Review *"
                    placeholderName={"e.g. Great!, Product."}
                    isError={this.isError('review')}
                    value={review}
                    onChangeText={value => this.onTextChange("review", value)}
                    getFocus={ref => this.input9 = ref}
                    onSubmitEditing={() => { }}
                />
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
