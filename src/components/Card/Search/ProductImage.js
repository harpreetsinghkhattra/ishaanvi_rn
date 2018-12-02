import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { WView, WRow } from '../../common'

export default class ProductImage extends PureComponent {

    state = {
        imgWidth: 0,
        imgHeight: 0
    }

    static propTypes = {
        source: PropTypes.any,
        width: PropTypes.number,
        height: PropTypes.number
    }

    static defaultProps = {
        source: {
            uri: 'https://images.all-free-download.com/images/graphicthumb/beautiful_natural_scenic_03_hd_picture_166230.jpg'
        }
    }

    componentWillMount = () => {
        const { source } = this.props;

        try {
            Image.getSize(source.uri, (width, height) => this.setState({ imgWidth: width, imgHeight: height }))
        } catch (error) { console.log('error', error)}
    }


    render() {
        const { source } = this.props;
        const { width, height } = this.props;
        const { imgHeight, imgWidth } = this.state;

        const newWidth = imgWidth ? imgWidth * width / imgWidth : width;
        const newHeight = imgHeight ? imgHeight * width / imgWidth : width;

        return (
            <Image source={source} style={{ width: newWidth, height: newHeight }} />
        )
    }
}
