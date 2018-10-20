import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native';
import { WText, WView } from '../../common';
import { SelectedImage } from './';

export default class SelectedImagesList extends Component {

    static propTypes = {
        heading: PropTypes.string,
        data: PropTypes.array,
        deleteImage: PropTypes.func
    }

    render = () => {
        const { heading, data, deleteImage } = this.props;

        return (
            <WView dial={4} >
                {/*<WText fontSize={14} right fontFamily="Muli-Bold">{heading}</WText>*/}
                <FlatList
                    horizontal={true}
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => (`item-${index}`)}
                    renderItem={({ item, index }) => (
                        <SelectedImage
                            deleteImage={deleteImage.bind(this, index)}
                            image={{ uri: item }} />
                    )}
                />
            </WView>
        )
    }
}
