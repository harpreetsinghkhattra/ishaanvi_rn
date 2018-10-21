import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity, PixelRatio } from 'react-native'
import TabViews from '../Tabs/TabViews';
import Palette from '../../Palette';

import { WView, WRow } from '../../components/common/';

/**
 * It is showing sign up and sign in component header in login screen.
 */
export default class SliderIndeicator extends Component {
    static propTypes = {
        ...View.propTypes,
        initialPage: PropTypes.number,
        pager: PropTypes.instanceOf(TabViews),
        tabs: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            iconSource: Image.propTypes.source,
            selectedIconSource: Image.propTypes.source
        })).isRequired,
        changePageWithAnimation: PropTypes.bool,
    }

    /**
     * default properties
     */
    static defaultProps = {
        tabs: [],
        changePageWithAnimation: false
    }

    state = {
        selectedIndex: this.props.initialPage,
        left: 0
    }

    render() {
        const circle = require('../../images/circle.png');

        let {
            tabs, pager, style, itemStyle, selectedItemStyle, iconStyle,
            selectedIconStyle, textStyle, selectedTextStyle, changePageWithAnimation,
            onTabPress
        } = this.props
        if (!tabs || tabs.length === 0) return null

        let tabsView = tabs.map((tab, index) => {
            let isSelected = this.state.selectedIndex === index
            return (
                <Image
                    key={`tabs-indicator${index}`}
                    style={[styles.image, { tintColor: isSelected ? Palette.theme_color : Palette.white }]}
                    source={circle}
                />
            )
        })
        return (
            <View style={[styles.container, style]} >
                {tabsView}
            </View>
        )
    }

    onPageSelected(e) {
        this.setState({ selectedIndex: e.position })
    }

    onPageScroll(e) {
    }
}

//Styels for this component
const styles = StyleSheet.create({
    container: {
        height: 50,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 10,
        width: 10,
        margin: 5
    },
    text: {
        marginTop: 4,
        fontSize: 16,
        color: '#cccccc'
    },
    textSelected: {
        marginTop: 4,
        fontSize: 16,
        color: '#ffffff'
    },
    swiperIndicatorContainer: {
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute'
    },
    bottomBorder: {
        borderBottomWidth: (1.5 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.white,
        borderStyle: "solid"
    }
})
