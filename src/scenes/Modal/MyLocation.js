import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner } from '../../components/common';
import { ScrollView, PixelRatio, Alert, Modal, FlatList, Image, StyleSheet, PermissionsAndroid } from 'react-native';
import Palette from '../../Palette';
import { Large, WithSeprateIcon } from '../../components/UI/btn';
import { CheckBox } from '../../components/UI/checkbox';
import { routerNames } from '../../RouteConfig';
import { Api } from '../../api/Api';
import { InfoCompleteAutoSelect } from '../../components/Select/';
import { TextInputWithLabel } from '../../components/UI/input';
import { PlaceSearchHeader } from '../../components/Header';
import { UserLocation } from '../../model/UserLocation';
import { Storage, StorageKeys } from '../../helper/';

const storage = new Storage();

export default class MyLocation extends Component {

    state = {
        message: {},
        isLoadingLocation: false,
        isLoadingLocationDetail: false,
        isLoadingZipcode: false
    }

    static propTypes = {
        data: PropTypes.object
    }

    /** On change */
    onTextChange = (key, value) => {
        this.setState({ [key]: value });
        UserLocation.setUserLocationData({ [key]: value });
    }

    async requestLocationPermission() {
        try {
            const isLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

            if (isLocationPermission) {
                alert('already present');
                this.getGeoLocation();
            }
            else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Ishaanvi wants your location',
                        'message': ''
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.getGeoLocation();
                } else {
                    alert("Camera permission denied");
                }
            }
        } catch (err) {
            console.warn(err)
        }
    }

    getGeoLocation() {
        this.setState({ isLoadingLocation: true });
        navigator.geolocation.getCurrentPosition(
            (position) => {

                this.onTextChange('latitude', position.coords.latitude);
                this.onTextChange('longitude', position.coords.longitude);

                this.getLocationDetailViaCurrentLocation();
            },
            (error) => alert(JSON.stringify(error)),
            {},
        );
    }

    /** Get location detail */
    getLocationDetailViaCurrentLocation = () => {
        const { latitude, longitude } = UserLocation.getUserLocationData();

        console.log('locations data', UserLocation.getUserLocationData())
        this.setState({ isLocationDetailLoading: true, isLoadingLocation: false });
        Api.getLocationDetailViaLatLng(["latlng"], { latlng: `${latitude},${longitude}` })
            .then(res => {
                console.log('locations data server',res);
                switch (res.status) {
                    case "OK":
                        this.setState({ isLocationDetailLoading: false });

                        alert('before');
                        if (res && res.results && ( !res.results.length || res.results.length === 0)) return;
                        alert('after');

                        this.onTextChange('address', res.results[0].formatted_address);
                        storage.setUserData(StorageKeys.UserLocation, UserLocation.getUserLocationData());
                        return;
                    default:
                        this.setState({ isLocationDetailLoading: false });
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({ isLocationDetailLoading: false });
            });
    }

    render() {
        const { screenWidth, screenHeight, screenHeightWithHeader, history, isVisible, setVisible, data } = this.props;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage, textInputContainerStyle, iconStyle } = styles;
        const icon = require('../../images/location.png');
        const send = require('../../images/send.png');
        const { isLoadingLocation, isLoadingLocationDetail, isLoadingZipcode } = this.state;

        return (
            <Modal
                animationType="fade"
                visible={isVisible}
                onRequestClose={() => { }}
                transparent={true}>
                <WView dial={8} flex style={{ minWidth: screenWidth, minHeight: screenHeight, backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                    <WView dial={8} style={[stretch, { position: 'absolute', bottom: 0 }]}>
                        <WRow dial={6} style={[stretch]}>
                            <WText onPress={setVisible} fontSize={16} padding={[10, 10]} fontFamily={"Muli-Bold"} color={Palette.white} right>Done</WText>
                        </WRow>
                        <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: 200, backgroundColor: 'green', alignItems: 'flex-end', justifyContent: 'flex-end' }, stretch]}>
                            <WView dial={8} padding={[10, 10]} style={[stretch]} backgroundColor={Palette.white}>
                                <WText padding={[0, 5, 5, 5]} center lines={2} fontSize={12} color={Palette.border_color} lines={2}>
                                    Ishaanvi wants a destination to show relevant collections
                            </WText>

                                <WTouchable dial={5} onPress={(isLoadingLocation || isLoadingLocationDetail || isLoadingZipcode) ? () => { } : this.requestLocationPermission.bind(this)} style={btnContainer} >
                                    {
                                        (isLoadingLocation || isLoadingLocationDetail) ?
                                            <WRow dial={5}>
                                                <WSpinner size={"small"} color={Palette.theme_color} />
                                                <WView padding={[0, 5]} dial={4} flex>
                                                    <WText fontSize={14} fontFamily={"Muli-Bold"}>{`Getting ${isLoadingLocationDetail ? "location detail" : "location"}, please wait...`}</WText>
                                                </WView>
                                            </WRow>
                                            :
                                            <WRow dial={5}>
                                                <Image source={send} style={iconStyle} />
                                                <WView padding={[0, 5]} dial={4} flex>
                                                    <WText fontSize={14} fontFamily={"Muli-Bold"}>USE CURRENT LOCATION</WText>
                                                </WView>
                                            </WRow>
                                    }
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
        alignItems: 'center',
        backgroundColor: Palette.white,
        borderColor: Palette.line_color,
        borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
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
