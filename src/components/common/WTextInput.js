import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Image } from 'react-native';
import { WRow, WView, WTouchable, WText } from './';
import Palette from '../../Palette';

export default class WTextInput extends Component {

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
        onSubmitEditing: PropTypes.func.isRequired,
        margin: PropTypes.array,
        padding: PropTypes.array,
        iconPath: PropTypes.any,
        isLoading: PropTypes.bool,
        containerStyle: PropTypes.any,
        flex: PropTypes.number,
        loading: PropTypes.bool
    }

    static defaultProps = {
        placeholderTextColor: Palette.placholderColor,
        keyboardType: "default",
        secureTextEntry: false,
        returnKeyType: "next"
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
            iconTintColor,
            loading,
            ...rest
        } = this.props;

        return (
            <WView dial={5} flex={flex ? flex : 0} padding={padding} margin={margin} style={{ alignItems: "stretch" }}>
                <WRow dial={5} style={[container, isError.status ? error : success, containerStyle]} >
                    {
                        iconPath &&
                        <WView dial={5} padding={[0, 5, 0, 0]}>
                            <Image source={iconPath} style={[iconStyle, isError.status ? error : success, { tintColor: iconTintColor }]} />
                        </WView>
                    }
                    <TextInput
                        {...rest}
                        ref={getFocus}
                        underlineColorAndroid={"transparent"}
                        placeholderTextColor={placeholderTextColor}
                        placeholder={placeholderName}
                        editable={isLoading ? false : true}
                        onSubmitEditing={onSubmitEditing}
                        secureTextEntry={isSecureTextEntry}
                        returnKeyType={returnKeyType}
                        keyboardType={keyboardType}
                        style={[inputText, style]}
                    />
                    {
                        secureTextEntry &&
                        <WTouchable dial={5} padding={[0, 5]} onPress={isLoading ? () => { } : this.toggle.bind(this)}>
                            <Image source={isSecureTextEntry ? require("../../images/show_password.png") : require("../../images/hide_password.png")} style={[iconStyle, isError.status ? error : success]} />
                        </WTouchable>
                    }
                    {
                        // Only to show right side loader
                        loading &&
                        <WView dial={5} padding={[0, 5]}>
                            <WSpinner size={"small"} color={Palette.theme_color} />
                        </WView>
                    }
                </WRow>
                {isError.status && isError.message !== '' && <WText dial={6} fontSize={10} right color={Palette.red}>{isError.message}</WText>}
            </WView>
        )
    }
}

const styles = {
    container: {
        alignItems: 'stretch',
        alignSelf: "stretch",
        minHeight: 31,
        borderBottomWidth: 1,
        borderStyle: "solid",
        justifyContent: "space-between",
    },
    inputText: {
        minHeight: 31,
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
