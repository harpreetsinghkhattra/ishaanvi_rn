import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WView, WTouchable } from '../../common';
import { Image } from 'react-native';
import Palette from '../../../Palette';

export default class CheckBox extends Component {

    state = {
        isSelected: false
    }

    static propTypes = {
        isSelected: PropTypes.bool,
        onPress: PropTypes.func,
        isError: PropTypes.object
    }

    static defaultProps = {
        isSelected: false,
        isError: { message: "", status: "" }
    }

    toggleBtn = () =>
        this.setState(
            (prevState) => ({ isSelected: (prevState.isSelected ? false : true) }),
            () => this.props.onPress(this.state.isSelected)
        );

    render() {
        const { icon, success, error } = styles;
        const checked = require("../../../images/checked.png");
        const unChecked = require("../../../images/unChecked.png");
        const { isSelected } = this.state;
        const { isError, isLoading } = this.props;

        return (
            <WTouchable dial={5} onPress={isLoading ? () => { } : this.toggleBtn.bind(this)}>
                <Image style={[icon, isError.status ? error : success]} source={isSelected ? checked : unChecked} />
            </WTouchable >
        )
    }
}

const styles = {
    icon: {
        width: 20,
        height: 20
    },
    success: {
        tintColor: Palette.text_color
    },
    error: {
        tintColor: Palette.red
    }
}
