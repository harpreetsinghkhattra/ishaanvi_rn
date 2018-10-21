import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Image } from 'react-native';
import { WRow, WView, WTouchable, WText, WSpinner } from '../../common';
import Palette from '../../../Palette';

export default class TextInputWithLabel extends Component {

    state = {
        isSecureTextEntry: false
    }

    static propTypes = {
        placeholderTextColor: PropTypes.string,
        secureTextEntry: PropTypes.bool,
        returnKeyType: PropTypes.string,
        source: PropTypes.any,
        placeholderName: PropTypes.string.isRequired,
        keyboardType: PropTypes.string,
        value: PropTypes.string,
        onSubmitEditing: PropTypes.func.isRequired,
        margin: PropTypes.array,
        padding: PropTypes.array,
        iconPath: PropTypes.any,
        isLoading: PropTypes.bool,
        containerStyle: PropTypes.any,
        flex: PropTypes.number,
        isLoadingValidNumber: PropTypes.bool,
        label: PropTypes.string
    }

    static defaultProps = {
        placeholderTextColor: Palette.placholderColor,
        keyboardType: "default",
        secureTextEntry: false,
        returnKeyType: "next",
        label: "Label"
    }

    toggle = () => {
        this.setState(prevState => {
            return { isSecureTextEntry: prevState.isSecureTextEntry ? false : true }
        })
    }

    componentDidMount = () => {
        this.setState({ isSecureTextEntry: this.props.secureTextEntry ? true : false })
    }


    render = () => {
        const { container, inputText, iconStyle, error, success } = styles;
        const { isSecureTextEntry } = this.state;
        const {
            placeholderTextColor,
            placeholderName,
            keyboardType,
            onSubmitEditing,
            secureTextEntry = undefined,
            returnKeyLabel,
            returnKeyType,
            source,
            style,
            getFocus,
            padding,
            margin,
            iconPath,
            isError = { status: false, message: "" },
            isLoading,
            containerStyle,
            flex,
            label,
            isLoadingValidNumber,
            editable,
            ...rest
        } = this.props;

        return (
            <WView dial={5} flex={flex ? flex : 0} padding={padding} margin={margin} style={{ alignItems: "stretch" }}>
                <WText>
                    <WText fontSize={14} padding={[5, 0]} fontFamily="Muli-Bold">
                        {label}
                    </WText>
                </WText>
                <WRow dial={5} style={[container, containerStyle, isError.status ? error : success]}>
                    {
                        iconPath &&
                        <WView dial={5} padding={[0, 5, 0, 0]}>
                            <Image source={iconPath} style={[iconStyle, isError.status ? error : success]} />
                        </WView>
                    }
                    <TextInput
                        {...rest}
                        ref={getFocus}
                        underlineColorAndroid={"transparent"}
                        placeholderTextColor={placeholderTextColor}
                        placeholder={placeholderName}
                        editable={(isLoading || editable) ? false : true}
                        onSubmitEditing={onSubmitEditing}
                        secureTextEntry={isSecureTextEntry}
                        returnKeyType={returnKeyType}
                        keyboardType={keyboardType}
                        style={[inputText, style]}
                    />
                    {
                        isLoadingValidNumber &&
                        <WSpinner size="small" color={Palette.theme_color} />
                    }
                    {
                        secureTextEntry &&
                        <WTouchable dial={5} padding={[0, 5]} onPress={isLoading ? () => { } : this.toggle.bind(this)}>
                            <Image source={isSecureTextEntry ? require("../../../images/show_password.png") : require("../../../images/hide_password.png")} style={[iconStyle, isError.status ? error : success]} />
                        </WTouchable>
                    }
                </WRow>
                {isError.status && <WText dial={6} fontSize={10} right color={Palette.red}>{isError.message}</WText>}
            </WView>
        )
    }
}

const styles = {
    container: {
        alignItems: 'stretch',
        alignSelf: "stretch",
        height: 31,
        borderBottomWidth: 1,
        borderStyle: "solid",
        justifyContent: "space-between",
    },
    inputText: {
        height: 31,
        padding: 0,
        fontFamily: "Muli",
        fontSize: 14,
        fontStyle: "normal",
        letterSpacing: 0,
        color: Palette.text_color,
        flex: 1,
        alignSelf: "stretch"
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    success: {
        tintColor: Palette.text_color,
        borderColor: Palette.border_color,
    },
    error: {
        tintColor: Palette.red,
        borderColor: Palette.red
    }
}
