import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native';
import { WText, WView } from '../common';
import { SelectProductTypeItem } from '../ListItems/';
import Palette from '../../Palette';

export default class SelectProductTypeList extends Component {

    state = {
        data: []
    }

    static propTypes = {
        heading: PropTypes.string,
        data: PropTypes.array,
        value: PropTypes.string,
        isError: PropTypes.object
    }

    componentDidMount = () => {
        this.parseData();
    }

    parseData = () => {
        const { data, value } = this.props;
        var tempData = data.map((ele) => {
            if (value === ele.toLowerCase()) return ({ label: ele, isSelected: true });
            else return ({ label: ele, isSelected: false })
        });
        this.setState({ data: tempData });
    }

    /** Select item */
    selectItem = (item, index) => {
        const { onSelect } = this.props;
        this.setState(prevState => {
            var tempData = prevState.data.map((ele, i) => {
                if (index === i) {
                    ele.isSelected = true;
                    onSelect(ele.label.toLowerCase());
                } else ele.isSelected = false;
                return ele;
            });
            return ({ data: tempData });
        })
    }

    render = () => {
        const { heading, isError, onSelect } = this.props;
        const { data } = this.state;

        return (
            <WView dial={4} >
                <WText fontSize={14} right fontFamily="Muli-Bold" color={isError && isError.status ? Palette.red : Palette.text_color}>{heading}</WText>
                <FlatList
                    data={data}
                    style={{ alignSelf: 'stretch' }}
                    keyExtractor={(item, index) => (`item-${index}`)}
                    renderItem={({ item, index }) => {
                        return (
                            <SelectProductTypeItem
                                label={item && item.label}
                                isError={isError}
                                selected={item && item.isSelected}
                                onPress={this.selectItem.bind(this, item, index)}
                            />
                        );
                    }}
                />
            </WView>
        )
    }
}
