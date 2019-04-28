import React, { Component } from 'react'
import { WRow, WView, WButton, WTextInput, WText, WTouchable } from '../common';
import { Image, Keyboard } from 'react-native';
import Palette from '../../Palette';
import { MyLocation } from '../../scenes/Modal';
import { User } from '../../model/user';
import { Search } from '../../model/search';

export default class SearchHeaderViaProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLocationModalVisible: false,
            isFilter: true,
            hasSearchFocus: false,
            searchValue: Search.getSearchData().search ? Search.getSearchData().search : ""
        }

        this._isMounted = true;
    }

    _setState = (value, cb) => {
        if (!this._isMounted) return false;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount = () => {
        const location = User.getUserData().location;
        if (!location || (location && !location.address))
            this.setLocationModalVisible(true);
    }

    /** Set filter value */
    isFilter = isFilter => {
        // this.setState({ isFilter }); 
    }

    /** Set visible */
    setLocationModalVisible = (isLocationModalVisible, location) => {
        if (location && typeof location === 'string') {
        } else this._setState({ isLocationModalVisible })
    }

    onChangeText = (key, value) => {
        const { onSubmit } = this.props;

        this._setState({ [key]: value });
        if (key === "searchValue") Search.setSearchData({ search: value });

        onSubmit(value, true);
    }

    onSearchFocus = () => {
        const { isAutoFillView } = this.props;
        this._setState({ hasSearchFocus: true, isLocationModalVisible: false });
        isAutoFillView(true);
    }

    onSearchBlur = () => {
        const { isAutoFillView } = this.props;
        this._setState({ hasSearchFocus: false, isLocationModalVisible: false });
        this.input1 && this.input1.blur();
        isAutoFillView(false);
    }

    render() {
        const { textInputContainer, textInputContainerStyle, btnContainerStyle, btnContainerStyle1, stretch, iconStyle } = styles
        const { isLocationModalVisible, hasSearchFocus, searchValue, isFilter } = this.state;
        const filterIcon = require('../../images/filter.png');
        const { openFilter, onSubmit, isLoading } = this.props;
        const location = User.getUserData().location;

        return (
            <WRow dial={5} padding={[5, 10]} backgroundColor={Palette.theme_color}>
                <MyLocation
                    {...this.props}
                    isVisible={isLocationModalVisible}
                    setVisible={this.setLocationModalVisible.bind(this, false)}
                />
                <WRow dial={5} padding={[0, 5]} flex style={textInputContainer}>
                    {
                        !hasSearchFocus ?
                            <WTextInput
                                flex={1}
                                getFocus={ref => this.input2 = ref}
                                containerStyle={[textInputContainerStyle]}
                                placeholderName="Location"
                                value={location && location.address ? location.address : ''}
                                onFocus={() => {
                                    this.setLocationModalVisible(true);
                                    this.input2.blur();
                                    Keyboard.dismiss();
                                }}
                                onChangeText={this.setLocationModalVisible.bind(this, true)}
                                style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold' }}
                                iconTintColor={Palette.orange}
                                iconPath={require("../../images/send.png")}
                                onSubmitEditing={()=> {}}
                            /> : null
                    }

                    {
                        !hasSearchFocus ?
                            <WView margin={[0, 5, 0, 0]} style={btnContainerStyle} /> : null
                    }

                    <WTextInput
                        flex={1}
                        loading={isLoading}
                        onFocus={this.onSearchFocus.bind(this)}
                        onBlur={this.onSearchBlur.bind(this)}
                        onLeftViewPress={this.onSearchBlur.bind(this)}
                        getFocus={ref => this.input1 = ref}
                        containerStyle={textInputContainerStyle}
                        placeholderName="Search"
                        value={searchValue}
                        onChangeText={value => this.onChangeText('searchValue', value)}
                        style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold' }}
                        iconTintColor={Palette.orange}
                        iconPath={hasSearchFocus ? require("../../images/back.png") : require("../../images/search.png")}
                        onSubmitEditing={onSubmit.bind(this, searchValue, false)}
                    />
                    {
                        isFilter ?
                            <WTouchable onPress={openFilter} dial={5} padding={[0, 10]} style={btnContainerStyle}>
                                <Image source={filterIcon} style={iconStyle} />
                            </WTouchable> : null
                    }
                </WRow>
            </WRow>
        )
    }
}

const styles = {
    stretch: {
        alignItems: "stretch"
    },
    textInputContainer: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Palette.white,
        backgroundColor: Palette.white
    },
    textInputContainerStyle: {
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 0,
        alignItems: 'center',
        backgroundColor: Palette.white
    },
    btnContainerStyle: {
        borderLeftWidth: 1,
        borderColor: Palette.line_color,
        borderStyle: "solid",
        minHeight: 20
    },
    btnContainerStyle1: {
        height: 40,
        borderRadius: 5,
        backgroundColor: Palette.white
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: Palette.orange
    }
}
