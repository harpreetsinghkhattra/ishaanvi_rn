import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity, PixelRatio } from 'react-native'
import TabViews from '../../Tabs/TabViews';
import Palette from '../../../Palette';
import { WView, WRow, WText } from '../../common';

/**
 * It is showing sign up and sign in component header in login screen.
 */
export default class PagerTabIndicator extends Component {
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
        console.log(this.state.left);
        let {
            tabs, pager, style, itemStyle, selectedItemStyle, iconStyle,
            selectedIconStyle, textStyle, selectedTextStyle, changePageWithAnimation,
            onTabPress
        } = this.props
        if (!tabs || tabs.length === 0) return null

        let tabsView = tabs.map((tab, index) => {
            let isSelected = this.state.selectedIndex === index
            return (
                <TouchableOpacity
                    style={[styles.itemContainer, isSelected ? selectedItemStyle : itemStyle]}
                    activeOpacity={0.6}
                    key={index}
                    onPress={() => {
                        if (typeof tab.onTabPress === "function") {
                            tab.onTabPress();
                            return;
                        }
                        if (!isSelected) {
                            if (this.props.changePageWithAnimation)
                                pager.setPage(index);
                            else pager.setPageWithoutAnimation(index);
                        }
                        return;
                    }}
                >
                    <WView flex dial={5} padding={[8, 0]} style={[isSelected ? styles.bottomBorder : {}]}>
                        <WText fontSize={18} fontFamily={"Muli-Bold"} color={isSelected ? Palette.black : Palette.white}>{tab.label}</WText>
                    </WView>
                </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: Palette.theme_color
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 22,
        width: 22
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
        borderBottomWidth: (3 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.black,
        borderStyle: "solid",
        borderRadius: 1,
        alignSelf: 'stretch'
    }
})
