import React, { Component } from 'react'
import { WRow, WView, WButton, WTextInput, WText } from '../common';
import Palette from '../../Palette';

export default class SearchHeader extends Component {
    render() {
        const { textInputContainerStyle, btnContainerStyle, btnContainerStyle1 } = styles

        return (
            <WRow dial={5} padding={[5, 5]} backgroundColor={Palette.theme_color} style={{ justifyContent: "space-between" }}>
                <WTextInput
                    flex={1}
                    containerStyle={textInputContainerStyle}
                    placeholderName="Location"
                    iconPath={require("../../images/search.png")}
                    onSubmitEditing={() => { }}
                />
                <WButton
                    dial={5}
                    flex
                    label="Category"
                    component={() => <WText fontSize={12} >Category</WText>}
                    containerStyle={btnContainerStyle}
                />
                <WButton
                    dial={5}
                    btnPadding={[5, 10]}
                    component={() => <WText fontSize={12} >Go</WText>}
                    containerStyle={[btnContainerStyle1]} 
                />
            </WRow>
        )
    }
}

const styles = {
    textInputContainerStyle: {
        height: 40,
        borderWidth: 0,
        padding: 5,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: Palette.white,
    },
    btnContainerStyle: {
        height: 40,
        borderRadius: 5,
        marginRight: 5,
        backgroundColor: Palette.white
    },
    btnContainerStyle1: {
        height: 40,
        borderRadius: 5,
        backgroundColor: Palette.white
    }
}
