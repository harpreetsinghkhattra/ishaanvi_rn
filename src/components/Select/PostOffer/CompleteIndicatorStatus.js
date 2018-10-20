import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WView, WRow, WText } from '../../common'
import Palette from '../../../Palette'
import { StyleSheet } from 'react-native'

export default class CompleteIndicatorStatus extends Component {
    static propTypes = {
        maxSelectedIndexNumber: PropTypes.number
    }

    static defaultProps = {
        maxSelectedIndexNumber: 1 
    }

    render() {
        const { badge, badgeSelected, badgeUnSelected, container, line } = styles;
        const { maxSelectedIndexNumber } = this.props;

        return (
            <WRow dial={5} style={[container]}>
                <WView dial={5}>
                    <WView dial={5} style={[badge, maxSelectedIndexNumber >= 1 ? badgeSelected : badgeUnSelected]}>
                        <WText color={Palette.white}>1</WText>
                    </WView>
                    <WText color={maxSelectedIndexNumber >= 1 ? Palette.theme_color : Palette.line_color}>Details</WText>
                </WView>

                <WView style={line} flex padding={[0, 5]} />

                <WView dial={5}>
                    <WView dial={5} style={[badge, maxSelectedIndexNumber >= 2 ? badgeSelected : badgeUnSelected]}>
                        <WText color={Palette.white}>2</WText>
                    </WView>
                    <WText color={maxSelectedIndexNumber >= 2 ? Palette.theme_color : Palette.line_color}>Photos</WText> 
                </WView>

                <WView style={line} flex padding={[0, 5]} />

                <WView dial={5}>
                    <WView dial={5} style={[badge, maxSelectedIndexNumber >= 3 ? badgeSelected : badgeUnSelected]}>
                        <WText color={Palette.white}>3</WText>
                    </WView>
                    <WText color={maxSelectedIndexNumber >= 3 ? Palette.theme_color : Palette.line_color}>Finish</WText>
                </WView>

            </WRow>
        )
    }
}

const styles = {
    container: {
        alignItems: 'stretch',
        backgroundColor: Palette.white,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        padding: 5,
        borderColor: Palette.line_color,
        borderTopWidth: StyleSheet.hairlineWidth * 1
    },
    badge: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    badgeSelected: {
        backgroundColor: Palette.theme_color
    },
    badgeUnSelected: {
        backgroundColor: Palette.line_color
    },
    line: {
        height: 2,
        margin: 5, 
        alignSelf: 'center', 
        backgroundColor: Palette.theme_color
    }
}
