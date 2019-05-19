import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native';
import { WText, WView } from '../common';
import { SelectProductTypeItem } from '../ListItems/';
import Palette from '../../Palette';

export default class SelectProductTypeList extends Component {

    state = {
        data: [],
    }

    static propTypes = {
        heading: PropTypes.string,
        data: PropTypes.array,
        value: PropTypes.any,
        isError: PropTypes.object,
        isMultiple: PropTypes.bool,
        right: PropTypes.bool
    }

    static defaultProps = {
        right: true
    }

    componentDidMount = () => {
        this.parseData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { value } = this.props;
        if (value && value.length !== prevProps.value.length) this.parseData();
    }

    parseData = () => {
        const { data, value, isMultiple } = this.props;
        var tempData = data.map((ele) => {
            if (isMultiple && value && value.findIndex(category => category === ele.toLowerCase()) > -1) return ({ label: ele, isSelected: true });
            else if (!isMultiple && value === ele.toLowerCase()) return ({ label: ele, isSelected: true });
            else return ({ label: ele, isSelected: false })
        });

        console.log("slectProductType list", tempData);
        console.log("slectProductType list", value);
        this.setState({ data: tempData });
    }

    /** Select item */
    selectItem = (item, index) => {
        const { onSelect, isMultiple } = this.props;
        this.setState(prevState => {
            var tempData = prevState.data.map((ele, i) => {
                if (index === i) {
                    if (isMultiple) ele.isSelected = ele.isSelected ? false : true;
                    else ele.isSelected = true;
                    onSelect(ele.label.toLowerCase(), ele.isSelected);
                } else if (!isMultiple) ele.isSelected = false;
                return ele;
            });
            return ({ data: tempData });
        })
    }

    render = () => {
        const { heading, isError, onSelect, right } = this.props;
        const { data } = this.state;

        return (
            <WView dial={4} >
                {
                    right ?
                        <WText fontSize={14} right fontFamily="Muli-Bold" color={isError && isError.status ? Palette.red : Palette.text_color} lines={20}>{heading}</WText> :
                        <WText fontSize={14} left fontFamily="Muli-Bold" color={isError && isError.status ? Palette.red : Palette.text_color} lines={20}>{heading}</WText>
                }

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
