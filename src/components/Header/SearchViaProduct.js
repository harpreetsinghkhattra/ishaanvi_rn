import React, { Component } from 'react'
import { WRow, WView, WButton, WTextInput, WText, WTouchable } from '../common';
import { Image, Keyboard } from 'react-native';
import Palette from '../../Palette';
import { MyLocation } from '../../scenes/Modal';
import { User } from '../../model/user';

export default class SearchHeaderViaProduct extends Component {

    state = {
        isLocationModalVisible: false,
        searchValue: ''
    }

    componentDidMount = () => {
        const location = User.getUserData().location;
        if (!location || (location && !location.address))
            this.setLocationModalVisible(true);
    }


    /** Set visible */
    setLocationModalVisible = (isLocationModalVisible, location) => {
        if (location && typeof location === 'string') {
        } else this.setState({ isLocationModalVisible })
    }

    onChangeText = (key, value) => {
        const { onSubmit } = this.props;

        this.setState({ [key]: value });
        value.length && onSubmit(value);
    }

    render() {
        const { textInputContainer, textInputContainerStyle, btnContainerStyle, btnContainerStyle1, stretch, iconStyle } = styles
        const { isLocationModalVisible, searchValue } = this.state;
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
                    <WTextInput
                        flex={1}
                        loading={isLoading}
                        getFocus={ref => this.input1 = ref}
                        containerStyle={textInputContainerStyle}
                        placeholderName="Product Name"
                        value={searchValue}
                        onChangeText={value => this.onChangeText('searchValue', value)}
                        style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold' }}
                        iconTintColor={Palette.border_color}
                        iconPath={require("../../images/search.png")}
                        onSubmitEditing={onSubmit.bind(this, searchValue)}
                    />
                    <WTouchable onPress={openFilter} dial={5} padding={[0, 10]} style={btnContainerStyle}>
                        <Image source={filterIcon} style={iconStyle} />
                    </WTouchable>
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
        borderStyle: "solid"
    },
    btnContainerStyle1: {
        height: 40,
        borderRadius: 5,
        backgroundColor: Palette.white
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: Palette.border_color
    }
}
