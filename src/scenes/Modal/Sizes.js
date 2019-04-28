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

export default class Sizes extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            selectedSize: ""
        }

        this.filterData = [
            {
                category: "designers \n(men, woman)",
                data: [
                    {
                        data: [
                            "XXS",
                            "XS",
                            "S",
                            "M",
                            "L",
                            "XL",
                            "XXL",
                            "3XL",
                            "4XL",
                            "5XL"
                        ]
                    }
                ]
            },
            {
                category: "boutiques",
                data: [
                    {
                        data: [
                            "S",
                            "M",
                            "L",
                            "XL"
                        ]
                    }
                ]
            },
            {
                category: "garments",
                data: [
                    {
                        data: [
                            "XS",
                            "S",
                            "M",
                            "L",
                            "XL"
                        ]
                    }
                ]
            },
            {
                category: 'multi brand\'s',
                data: [
                    {
                        category: "Shoes",
                        data: [
                            "1",
                            "1.5",
                            "2",
                            "2.5",
                            "3",
                            "3.5",
                            "4",
                            "4.5",
                            "5",
                            "5.5",
                            "6",
                            "6.5",
                            "7",
                            "7.5",
                            "8",
                            "8.5",
                            "8",
                            "9",
                            "9.5",
                            "10",
                            "11"
                        ]
                    },
                    {
                        category: "Clothes",
                        data: [
                            "XS",
                            "S",
                            "M",
                            "L",
                            "XL"
                        ]
                    },
                    {
                        category: "Others(Bags, Socks, Goggles, Watches etc )",
                        data: [
                            "Small",
                            "Medium",
                            "Large"
                        ]
                    }
                ]
            }, {
                category: 'Cloth \nHouse/Shop',
                data: [
                    {
                        data: [
                            "XS",
                            "S",
                            "M",
                            "L",
                            "XL",
                            "Free Sizes"
                        ]
                    }
                ]
            }
        ]
    }

    static propTypes = {
        data: PropTypes.object,
        isPrice: PropTypes.bool
    }

    static defaultProps = {
        isPrice: false
    }

    componentDidMount = () => {
        const { data } = this.props;

        this.setState({
            selectedSize: data.size ? data.size : ""
        });
    }

    addCategory = (selectedSize) => {
        this.setState({
            selectedSize
        })
    }

    onApply = () => {
        const { setVisible } = this.props;
        const { selectedSize } = this.state;

        // /** Close the modals */
        setVisible(false, selectedSize);
        // alert(JSON.stringify(this.filterData));
    }

    onClearAll = () => {
        this.loadToRender();
    }

    render() {
        const { screenWidth, screenHeight, screenHeightWithHeader, history, isVisible, setVisible, data, isPrice } = this.props;
        const { stretch, btnStyle, btnContainer, border, circleView, image, caretImage, textInputContainerStyle, iconStyle } = styles;
        const icon = require('../../images/location.png');
        const send = require('../../images/send.png');
        const { selectedSize } = this.state;
        const index = this.filterData.findIndex(ele => ele.category.toUpperCase() === data.category);
        const selectedCategory = this.filterData[index > -1 ? index : 0].data;

        return (
            <Modal
                animationType="fade"
                visible={isVisible}
                onRequestClose={() => { }}
                transparent={true}>
                <WView dial={5} flex style={{ minWidth: screenWidth, minHeight: screenHeight, backgroundColor: Palette.white, justifyContent: 'space-between' }}>
                    <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: 150 }, stretch]}>
                        {
                            selectedCategory.map((ele, index) =>
                                <WView key={`filter-data-${index}`} dial={8} padding={[10, 10]} style={[stretch]} backgroundColor={Palette.white}>
                                    <SelectProductTypeList
                                        isMultiple={false}
                                        heading={ele && ele.category ? ele.category : data.category}
                                        onSelect={this.addCategory.bind(this)}
                                        value={selectedSize}
                                        data={ele.data} />
                                </WView>)
                        }
                    </ScrollView>
                    <FilterBottomBar
                        onClose={setVisible.bind(this, false, '')}
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
