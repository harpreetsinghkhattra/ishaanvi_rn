import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WView, WText, WRow, Header, WTextInput, WTouchable, WSpinner, Slider } from '../../components/common';
import { ScrollView, PixelRatio, Alert, Modal, FlatList, Image, StyleSheet } from 'react-native';
import Palette from '../../Palette';
import { Large, WithSeprateIcon } from '../../components/UI/btn';
import { CheckBox } from '../../components/UI/checkbox';
import { routerNames } from '../../RouteConfig';
import { Api } from '../../api/Api';
import { InfoCompleteAutoSelect } from '../../components/Select/';
import { TextInputWithLabel } from '../../components/UI/input';
import { FilterBottomBar, FilterHeader } from '../../components/Header';
import { PriceRange } from '../../components/Card/Modal';
import { SelectProductTypeList } from '../../components/Lists';
import { User } from '../../model/user';
import { Storage, StorageKeys, Helper } from '../../helper';
const UserData = new Storage();

export default class HomeFilter extends PureComponent {

    state = {
        message: {},
        loadToRender: false
    }

    constructor(props) {
        super(props);
        this.filterData = User.getUserData().filterData ? User.getUserData().filterData : {
            "area": [0, 500],
            "category": [],
            "price": [0, 0]
        };
        this.tempFilterData;
    }

    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (!this.filterData) return;
        const { category, price, area } = this.filterData;

        this.tempFilterData = {
            "area": Array.from(area ? area : []),
            "category": Array.from(category ? category : []),
            "price": Array.from(price ? price : [])
        };
    }

    defaultInit = () => {
        if (!this.tempFilterData) return;
        const { category, price, area } = this.tempFilterData;

        this.filterData = {
            "area": Array.from(area ? area : []),
            "category": Array.from(category ? category : []),
            "price": Array.from(price ? price : [])
        };
    }

    static propTypes = {
        data: PropTypes.object,
        isPrice: PropTypes.bool
    }

    static defaultProps = {
        isPrice: false
    }

    loadToRender = (cb = () => { }) => {
        this.setState(prevState => {

            return ({ loadToRender: prevState.loadToRender ? false : true });
        }, cb);
    }

    addCategory = (value) => {
        let { category } = this.filterData;
        if (category.findIndex(ele => ele === value) > -1) category.splice(category.findIndex(ele => ele === value), 1);
        else category.push(value);
    }

    onPriceChange = (min, max) => {
        this.filterData.price = Array.from([min, max]);
    }

    addArea = (value) => {
        this.filterData.area = Array.from(value);
    }

    onApply = () => {
        const { setVisible } = this.props;
        const { filterData } = User.getUserData();
        User.setUserData({ filterData: this.filterData });
        UserData.setUserData(StorageKeys.USER_DATA, User.getUserData());
        this.init();

        // /** Close the modals */
        setVisible(false, 'refresh');
        // alert(JSON.stringify(this.filterData));
    }

    onClearAll = () => {
        this.filterData = {
            "area": Array.from([0, 500]),
            "category": Array.from([]),
            "price": Array.from([0, 0])
        }

        this.loadToRender();

    }

    onCancel = () => {
        const { setVisible } = this.props;
        if (this.tempFilterData) {
            this.defaultInit();
            this.loadToRender(setVisible.bind(this, false, ''));
            return;
        }
        setVisible(false, '')
    }

    render() {
        const { screenWidth, screenHeight, screenHeightWithHeader, history, isVisible, setVisible, data, isPrice } = this.props;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage, textInputContainerStyle, iconStyle } = styles;
        const icon = require('../../images/location.png');
        const send = require('../../images/send.png');

        return (
            <Modal
                animationType="fade"
                visible={isVisible}
                onRequestClose={() => { }}
                transparent={true}>
                <WView dial={5} flex style={{ minWidth: screenWidth, minHeight: screenHeight, backgroundColor: Palette.white, justifyContent: 'space-between' }}>
                    <FilterHeader
                        onClearAll={this.onClearAll.bind(this)} />
                    <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: 150 }, stretch]}>
                        <WView dial={8} padding={[10, 10]} style={[stretch]} backgroundColor={Palette.white}>
                            <SelectProductTypeList
                                isMultiple={true}
                                heading={"Select Category "}
                                onSelect={this.addCategory.bind(this)}
                                value={this.filterData ? this.filterData.category : []}
                                data={['Multi Brand\'s', 'Garments', 'Boutiques', 'Designers \n(men, woman)', 'Cloth \nHouse/Shop']} />
                            {
                                isPrice ?
                                    <PriceRange
                                        price={this.filterData.price}
                                        onPriceChange={this.onPriceChange.bind(this)}
                                    /> : null
                            }
                            <Slider
                                value={this.filterData ? this.filterData.area : [0, 500]}
                                onValueChangeFinish={this.addArea.bind(this)}
                            />
                        </WView>
                    </ScrollView>
                    <FilterBottomBar
                        onClose={this.onCancel.bind(this)}
                        onApply={this.onApply.bind(this)}
                    />
                </WView >
            </Modal>
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch',
    },
    btnStyle: {
        borderColor: "#F7F7F7",
        borderWidth: StyleSheet.hairlineWidth * 2,
        height: 40,
        borderRadius: 5
    },
    border: {
        borderStyle: "solid",
        borderBottomWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.border_color
    },
    image: {
        width: 24,
        height: 24,
        tintColor: Palette.white,
    },
    circleView: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    caretImage: {
        position: 'absolute',
        top: -10
    },
    textInputContainerStyle: {
        height: 45,
        justifyContent: 'center',
        borderBottomWidth: 0,
        alignItems: 'center',
        backgroundColor: Palette.white,
        borderColor: Palette.line_color,
        borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderStyle: 'solid',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    btnContainer: {
        borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderColor: Palette.line_color,
        borderStyle: 'solid',
        backgroundColor: Palette.white,
        height: 45,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: Palette.text_color
    }
}
