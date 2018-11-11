import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WTouchable, WView, WText } from '../common'
import Palette from '../../Palette'

export default class FilterHeader extends Component {
    static propTypes = {
        onClearAll: PropTypes.func
    }

    render() {
        const { onClearAll } = this.props;
        const { container } = styles;

        return (
            <WRow dial={5} backgroundColor={Palette.white} style={container}>
                <WView dial={4} padding={[0, 10]}>
                    <WText fontSize={18} right fontFamily={"Muli-Bold"}>Filters</WText>  
                </WView>
                <WTouchable dial={6} onPress={onClearAll} padding={[0, 10]}>
                    <WText fontSize={14} right color={Palette.theme_color}>CLEAR ALL</WText>
                </WTouchable>
            </WRow>
        )
    }
}

const styles = {
    container: {
        height: 56,
        justifyContent: 'space-between',
        alignSelf: 'stretch' 
    }
};