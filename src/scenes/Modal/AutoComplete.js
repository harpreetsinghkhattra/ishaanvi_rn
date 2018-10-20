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
import { Storage, StorageKeys } from '../../helper';

const UserData = new Storage();

export default class AutoComplete extends Component {

    state = {
        isLoading: false,
        locations: [],
        isRecentLocations: true
    }

    constructor(props) {
        super(props);

        this.recentLocations = [];
    }

    static propTypes = {
        setLocation: PropTypes.func
    }

    componentDidMount = () => {
        this.setState({ isLoading: true });
        this.getLocationData();

        this.input1 && this.input1.focus();
    }


    async getLocationData() {
        let locations = await UserData.getUserInfo(StorageKeys.AUTO_COMPLETE_LOCATIONS);
        const rencentItemsCount = 9;

        if (locations) {
            var recentLocations = JSON.parse(locations);
            console.log(recentLocations);
            if (
                recentLocations &&
                recentLocations.length &&
                recentLocations.length > rencentItemsCount
            ) {
                recentLocations.splice(10, recentLocations.length - rencentItemsCount);
            }

            console.log('modified', recentLocations);
            this.recentLocations = Array.from(recentLocations && recentLocations.length > 0 ? recentLocations : []);
            this.setState({ isLoading: false, locations: Array.from(recentLocations) });
        } else this.setState({ isLoading: false });
    }

    /** On change */
    onTextChange = (key, value) => {
        this.setState({ isLoading: true });
        Api.autoCompleteLocation([key], { [key]: value })
            .then(res => {
                console.log(res);
                switch (res.status) {
                    case "OK":
                        this.setState({ isLoading: false, isRecentLocations: false, locations: res.predictions })
                        break;
                    default:
                        this.setState({ isLoading: false });

                }
            })
            .catch(err => {
                console.log(err)
                this.setState({ isLoading: false });
            });
    }

    _renderRow(item, index) {
        const { description, id } = item;
        const { image, border, stretch } = styles;
        const { locations } = this.state;
        const { setVisible } = this.props;
        const setLocation = () => {

            if (
                this.recentLocations &&
                this.recentLocations.length &&
                this.recentLocations.findIndex(ele => ele.id === id) > -1
            ) {

            } else {
                this.recentLocations.push(item);
                UserData.setUserData(StorageKeys.AUTO_COMPLETE_LOCATIONS, Array.from(this.recentLocations).reverse());
            }
            setVisible(false, description)
        }

        return (
            <WTouchable key={`location_item_${index}`} onPress={() => setLocation()} dial={4} padding={[10, 0]} style={[stretch, index !== locations.length - 1 ? border : {}]}>
                <WRow>
                    <Image style={image} source={require("../../images/location.png")} />
                    <WText margin={[0, 10]} fontSize={14}>{description}</WText>
                </WRow>
            </WTouchable>
        );
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history, isVisible, setVisible, setLocation } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { locations, isLoading, isRecentLocations } = this.state;

        console.log(this.props);
        return (
            <Modal
                animationType="slide"
                visible={isVisible}
                onRequestClose={() => { }}
                transparent={false}>
                <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                    <PlaceSearchHeader
                        value={""}
                        getFocus={ref => this.input1 = ref}
                        placeholderName={"Search for location"}
                        onChangeText={(value) => value.length > 3 && this.onTextChange("location", value)}
                        onSubmitEditing={() => { }}
                        onPress={() => setVisible(false)} />
                    <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'space-between' }, stretch]}>
                        <WView flex dial={5} padding={[20, 20]} style={[stretch]} >
                            <WView flex dial={2} style={[stretch]}>
                                {isRecentLocations && locations && locations.length !== 0 && <WText fontFamily={"Muli-Bold"} fontSize={18} color={Palette.theme_color} padding={[10, 0]}>Recent Locations :</WText>}
                                {isLoading && <WSpinner size={"small"} color={Palette.theme_color} />}
                                {isRecentLocations && locations && locations.length === 0 && !isLoading && <WText fontFamily={"Muli-Bold"} fontSize={14} color={Palette.border_color} padding={[10, 0]}>Find your location!</WText>}
                                {!isRecentLocations && locations && locations.length === 0 && !isLoading && <WText fontFamily={"Muli-Bold"} fontSize={14} color={Palette.border_color} padding={[10, 0]}>No Location Found!</WText>}
                                <FlatList
                                    keyExtractor={(item, index) => `location-${index}`}
                                    data={locations}
                                    renderItem={({ item, index }) => this._renderRow(item, index)}
                                />
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
        borderBottomWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.border_color
    },
    image: {
        width: 24,
        height: 24
    }
}
