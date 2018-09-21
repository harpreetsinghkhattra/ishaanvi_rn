import React, { Component } from "react";
import {
    FlatList
} from "react-native";
import PropTypes from 'prop-types';
import Palette from '../../Palette';
import { WRow, WView, WTouchable, WText } from '../common';
import { CategorySelect as CategorySelectBtn } from '../UI/btn';
import { RegisterSellerUser } from '../../model/RegisterSellerUser';

export default class CategorySelect extends Component {

    state = {
        data: []
    }

    static propTypes = {
        width: PropTypes.number,
        imageSource: PropTypes.any,
        data: PropTypes.array
    }

    componentWillMount = () => {
        const { data } = this.props;
        const selectedItem = RegisterSellerUser.getData();
        this.setState({ data: data.map((ele, i) => ele.label.toLowerCase() === selectedItem.category ? Object.assign(ele, { "isSelected": true }) : Object.assign(ele, { "isSelected": false })) });
    }

    _onPress = (item, index) => {
        RegisterSellerUser.setData({ "category": item.label.toLowerCase() })
        this.setState((prevState) => {
            return { data: prevState.data.map((ele, i) => i === index ? Object.assign(ele, { "isSelected": true }) : Object.assign(ele, { "isSelected": false })) };
        });
    }

    render = () => {

        const { data } = this.state;

        return (
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item, index) => `category-select-${index}`}
                renderItem={({ item, index }) => <CategorySelectBtn isSelected={item["isSelected"]} onPress={this._onPress.bind(this, item, index)} imageSource={item.imageSource} label={item.label} />}
            />
        );
    }
}
