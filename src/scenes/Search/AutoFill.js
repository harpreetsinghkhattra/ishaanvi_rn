import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner } from '../../components/common';
import { FlatList, Keyboard, Image } from 'react-native';
import Palette from '../../Palette';

export default class AutoFill extends PureComponent {

    static propTypes = {
        data: PropTypes.array
    }

    constructor(props) {
        super(props);

        this.state = {
            keyboardHeight: 0,
            isView: false
        }

        this._isMounted = true;
    }

    _setState = (value, cb) => {
        if (!this._isMounted) return;

        if (cb) this.setState(value, cb);
        else this.setState(value);
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
        this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
        this._isMounted = false;
    }

    _keyboardDidShow = (e) => {
        this._setState({
            keyboardHeight: e && e.endCoordinates && e.endCoordinates.height ? e.endCoordinates.height : 0
        })
    }

    _keyboardDidHide = (e) => {
        this._setState({
            keyboardHeight: e && e.endCoordinates && e.endCoordinates.height ? e.endCoordinates.height : 0
        })
    }

    isView = (isView) => this._setState({ isView })

    renderItem = ({ item, index }) => {
        const productIcon = require("../../images/addshop.png");
        const shopIcon = require("../../images/shop.png");
        const { iconStyle } = styles;
        const { isShop, value } = item;

        return (
            <WTouchable onPress={() => {
                alert(JSON.stringify(this.state));
            }}>
                <WRow dial={4} padding={[5, 10]} flex>
                    <Image source={isShop ? shopIcon : productIcon} style={iconStyle} />
                    <WText padding={[5, 10]} lines={2} fontSize={14}>{value + index}</WText>
                </WRow>
            </WTouchable>
        )
    }

    render() {
        const { data } = this.props;
        const { keyboardHeight, isView } = this.state;
        const { autoFillContainer, seprator } = styles;

        if(!isView) return null;
        
        return (
            <WView dial={2} backgroundColor={Palette.white} style={[autoFillContainer, { bottom: keyboardHeight }]}>
                <FlatList
                    data={data}
                    keyboardShouldPersistTaps={"always"}
                    ItemSeparatorComponent={() => {
                        return (
                            <WView margin={[0, 10]} backgroundColor={Palette.line_color} style={seprator} />
                        );
                    }}
                    keyExtractor={(item, index) => `search-item-auto-fill-${index}`}
                    renderItem={this.renderItem.bind(this)}
                />
            </WView>
        )
    }
}

const styles = {
    iconStyle: {
        width: 20,
        height: 20
    },
    autoFillContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'stretch'
    },
    seprator: {
        height: 1
    }
}
