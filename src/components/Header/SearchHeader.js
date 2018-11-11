// import React, { Component } from 'react'
// import { WRow, WView, WButton, WTextInput, WText } from '../common';
// import Palette from '../../Palette';

// export default class SearchHeader extends Component {
//     render() {
//         const { textInputContainerStyle, btnContainerStyle, btnContainerStyle1 } = styles

//         return (
//             <WRow dial={5} padding={[5, 5]} backgroundColor={Palette.theme_color} style={{ justifyContent: "space-between" }}>
//                 <WTextInput
//                     flex={1}
//                     containerStyle={textInputContainerStyle}
//                     placeholderName="Location"
//                     iconPath={require("../../images/search.png")}
//                     onSubmitEditing={() => { }}
//                 />
//                 <WButton
//                     dial={5}
//                     flex
//                     label="Category"
//                     component={() => <WText fontSize={12} >Category</WText>}
//                     containerStyle={btnContainerStyle}
//                 />
//                 <WButton
//                     dial={5}
//                     btnPadding={[5, 10]}
//                     component={() => <WText fontSize={12} >Go</WText>}
//                     containerStyle={[btnContainerStyle1]} 
//                 />
//             </WRow>
//         )
//     }
// }

// const styles = {
//     textInputContainerStyle: {
//         height: 40,
//         borderWidth: 0,
//         padding: 5,
//         marginRight: 5,
//         borderRadius: 5,
//         backgroundColor: Palette.white,
//     },
//     btnContainerStyle: {
//         height: 40,
//         borderRadius: 5,
//         marginRight: 5,
//         backgroundColor: Palette.white
//     },
//     btnContainerStyle1: {
//         height: 40,
//         borderRadius: 5,
//         backgroundColor: Palette.white
//     }
// }

import React, { Component } from 'react'
import { WRow, WView, WButton, WTextInput, WText, WTouchable } from '../common';
import { Image } from 'react-native';
import Palette from '../../Palette';
import { MyLocation } from '../../scenes/Modal';
import { User } from '../../model/user';

export default class SearchHeader extends Component {

    state = {
        isLocationModalVisible: false
    }

    componentDidMount = () => {
        const location = User.getUserData().location;
        if (location && (!location.zipCode || !location.latitude))
            this.setLocationModalVisible(true);
    }


    /** Set visible */
    setLocationModalVisible = (isLocationModalVisible, location) => {
        if (location && typeof location === 'string') {
        } else this.setState({ isLocationModalVisible })
    }

    render() {
        const { textInputContainer, textInputContainerStyle, btnContainerStyle, btnContainerStyle1, stretch, iconStyle } = styles
        const { isLocationModalVisible } = this.state;
        const filterIcon = require('../../images/filter.png');
        const { openFilter } = this.props;
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
                        containerStyle={textInputContainerStyle}
                        placeholderName="Location"
                        value={location.address}
                        onFocus={this.setLocationModalVisible.bind(this, true)}
                        onChangeText={this.setLocationModalVisible.bind(this, true)}
                        style={{ justifyContent: 'center', alignSelf: 'center', fontWeight: 'bold' }}
                        iconTintColor={Palette.border_color}
                        iconPath={require("../../images/location.png")}
                        onSubmitEditing={() => { }}
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
