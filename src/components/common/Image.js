import React, { Component } from 'react';
import { Image } from 'react-native';
import { WView } from './';
import PropTypes from 'prop-types';
import resolveAssetSource from 'resolveAssetSource';

export default class WImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };

        this.isStateChange = true;
    }

    componentDidMount = () => {
        this.isStateChange = true;
    }

    componentWillUnmount() {
        this.isStateChange = false;
    }

    static propTypes = {
        dial: PropTypes.number,
        containerStyle: PropTypes.any,
        imageStyle: PropTypes.any,
        source: PropTypes.any,
        width: PropTypes.number,
        ratio: PropTypes.number
    }

    static defaultProps = {
        dial: 5,
        width: 0,
        source: { uri: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }
    }

    _onLayout(event) {
        const { width, source, ratio } = this.props;
        const containerWidth = width ? width : event.nativeEvent.layout.width;

        if (this.props.ratio) {
            this.setState({
                width: containerWidth,
                height: containerWidth * ratio
            });
        } else {
            if (this.isStateChange) {
                if (source && source.uri) {
                    Image.getSize(source.uri, (width, height) => {
                        this.setState({
                            width: containerWidth,
                            height: containerWidth * height / width
                        });
                    });
                } else {
                    const { width, height } = resolveAssetSource(source);
                    this.setState({
                        width: containerWidth,
                        height: containerWidth * height / width
                    });
                }
            }
        }
    }

    render() {
        const { source, containerStyle, imageStyle } = this.props;
        const { dial } = this.props;

        return (
            <WView dial={dial} onLayout={this._onLayout.bind(this)} style={[containerStyle]}>
                <Image
                    ref={ref => this.image = ref}
                    source={source}
                    style={[
                        {
                            width: this.state.width,
                            height: this.state.height
                        },
                        imageStyle
                    ]} />
            </WView>
        );
    }
}

const styles = {
    container: {

    }
}