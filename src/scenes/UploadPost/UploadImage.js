import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { ChangeImage, EditActionView, UserInfo } from '../../components/Edit';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { CompleteIndicatorStatus, UploadPhoto } from '../../components/Select/PostOffer';
import { PostOffer } from '../../model/PostOffer';
import { Api, Socket, User as UserApi } from '../../api';
import { AlertMessage, AutoComplete } from '../Modal/';
import { add_product } from '../../api/SocketUrls';
import axios from 'axios';
import { ProgressBar } from '../../components/Edit';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 56;

export default class UserProfile extends Component {

    state = {
        isLoading: false,
        userData: {},
        alertMessageVisible: false,
        alertMessage: {},
        formData: {},
        uploadingImage: false,
        percentage: 0
    }

    componentWillMount = () => {
        const { photos, ...rest } = PostOffer.getData();
        this.setState({ formData: { photos }, userData: User.getUserData() });
    }

    /** On photos select */
    onPhotosSelect = (key, value) => {
        PostOffer.setData({ [key]: value });
    }

    setAlertMessageVisible(alertMessageVisible, alertMessage) {
        this.setState({ alertMessageVisible, alertMessage, isLoading: false });
    }

    uploadPhotos = (data) => {
        let { photos, itemCode, id, accessToken, status } = data;
        const { history, location } = this.props;
        const { screenType, item } = location.state;

        // photos = photos.map((uri, i) => {
        //     return ({
        //         uri,
        //         type: 'image/png',
        //         name: `product-photo-${i}`
        //     });
        // });
        // console.log('photos', photos);

        var formData = new FormData();
        photos.forEach((uri, i) => {
            formData.append('file', {
                uri,
                type: 'image/png',
                name: `product-photo-${i}`
            });
        });
        formData.append('id', id);
        formData.append('accessToken', accessToken);
        formData.append('itemCode', itemCode);
        formData.append('status', status ? status : 1);

        this.setState({ uploadingImage: true });
        axios.post('http://13.127.188.164/api/uploadProductFiles', formData, {
            onUploadProgress: (percentage) => {
                this.setState({
                    percentage: Math.round((percentage.loaded * 100) / percentage.total)
                })
            }
        }).then((res) => {
            this.setState({ uploadingImage: false, isLoading: false });
            if (res && res.data && res.data.message === "Success") {
                PostOffer.resetData();
                history.push(routerNames.post_offer_finish, { screenType: screenType === "edit" ? screenType : '' });
            } else this.setAlertMessageVisible(true, { status: res.message, heading: "", message: "Please try again!" });
        }).catch(error => {
            console.log("error: => ", error);
        });
    }

    /** On submit */
    sumbit = () => {
        const { history } = this.props;
        const { photos, itemCode, status } = PostOffer.getData();
        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        this.setState(() => ({ isLoading: true, errors: [] }), () => {
            Api.isValidForm(Object.keys({ photos, itemCode }), { photos, itemCode })
                .then(res => {
                    if (res && res.message) {
                        if (res.message === "Success" && photos.length) {
                            this.uploadPhotos({ photos, itemCode, id, accessToken, status });
                        } else if (photos.length === 0) this.setAlertMessageVisible(true, { status: res.message, heading: "No File Selected!", message: "Please select at least one file" });
                        else this.setAlertMessageVisible(true, { status: res.message, heading: "", message: "Please try again!" });
                    } else if (res && res.response) {
                        const { status, response } = res;
                        this.setState({ isLoading: false, errors: response && response.length ? response : [] });
                    }
                })
                .catch(err => console.log(err));
        });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { userData, formData, alertMessage, alertMessageVisible, isLoading, uploadingImage, percentage } = this.state;

        return (
            <WView dial={2} flex style={stretch}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Upload Photos"}
                />
                <AlertMessage
                    isVisible={alertMessageVisible}
                    data={alertMessage}
                    {...this.props}
                    setVisible={this.setAlertMessageVisible.bind(this, false)} />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        <UploadPhoto
                            onPhotosSelect={photos => this.onPhotosSelect('photos', photos)}
                        />
                        <WView dial={8} style={stretch}>
                            {
                                uploadingImage &&
                                <ProgressBar
                                    percentage={percentage}
                                    width={100}
                                />
                            }
                            <Large
                                label="Next"
                                isLoading={isLoading}
                                onPress={this.sumbit.bind(this)}
                                style={{ marginTop: 10 }}
                            />
                        </WView>
                    </WView>
                </ScrollView>
                <CompleteIndicatorStatus />
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