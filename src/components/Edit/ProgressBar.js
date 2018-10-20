import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WView, WText, Image } from '../common';
import Palette from '../../Palette';

export default class ProgressBar extends Component {
    static propTypes = {
        percentage: PropTypes.number,
        width: PropTypes.number
    }

    static defaultProps = {
        percentage: 20
    }

    render() {
        const { progressBar, progressBarContainer, stretch } = styles;
        const { percentage, width } = this.props;

        return (
            <WView dial={5} padding={[0, 20]} style={[{ alignSelf: 'stretch' }]}> 
                <WText padding={[10, 5]} center color={Palette.theme_color}>{`${percentage}%`}</WText>
                <WView dial={4} style={[progressBarContainer, width ? { width } : stretch]}>
                    <WView style={[progressBar, { width: `${percentage}%` }]} />
                </WView>
            </WView>
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    },
    progressBarContainer: {
        height: 2,
        backgroundColor: Palette.line_color
    },
    progressBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: Palette.theme_color,
        bottom: 0
    }
}
