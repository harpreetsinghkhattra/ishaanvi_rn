import Palette from './Palette';
import EventEmitter from 'EventEmitter';
import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Platform,
    StatusBar,
    ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { NativeRouter, BackButton } from 'react-router-native'

import MainScene from './scenes/MainScene';

const PORTRAIT = 0;
const LANDSCAPE = 1;

class Rootrn extends Component {

    constructor(props) {
        super(props);
        this._orientationEventEmitter = new EventEmitter();
        this.state = {
            booted: false,
            orientation: null,
            viewableScreenWidth: null,
            viewableScreenHeightWithHeader: null,
            viewableScreenHeight: null,
            screenWidth: null,
            screenHeight: null,
            scale: null,
            fontScale: null,
            userHasActivatedCallback: null
        };

    }

    componentWillMount() {

        // Get some initial size data
        const width = Math.round(Dimensions.get('window').width);
        const height = Math.round(Dimensions.get('window').height);
        const scale = Dimensions.get('window').scale;
        const fontScale = Dimensions.get('window').fontScale;

        // Set to state
        this.setState({
            screenWidth: width,
            screenHeight: height,
            orientation: width > height ? LANDSCAPE : PORTRAIT,
            scale: scale,
            fontScale: fontScale
        });
    }

    _onScreenUpdate(event) {
        console.log("screen update", event.nativeEvent);
        const width = Math.round(event.nativeEvent.layout.width);
        const height = Math.round(event.nativeEvent.layout.height);
        const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
        if (orientation !== this.state.orientation) {
            // emit orientation change event
            this._orientationEventEmitter.emit('orientation');
        }
        if (
            this.state.viewableScreenWidth !== width
        ) {
            this.setState({
                viewableScreenWidth: width,
                viewableScreenHeightWithHeader: height - this.headerHeight(),
                viewableScreenHeight: height,
                orientation: orientation
            });
        }
    }

    /**
     * Get header height
     */
    headerHeight() {
        return Platform.OS === 'ios' ? 64 : 56;
    }

    render() {
        return (
            <NativeRouter>
                <View
                    onLayout={(event) => this._onScreenUpdate(event)}
                    style={{
                        flex: 1,
                        backgroundColor: Palette.white
                    }}
                >
                    <BackButton />
                    <StatusBar hidden={false} backgroundColor={Palette.theme_color} />
                    {React.createElement(MainScene, {
                        booted: this.state.booted,
                        screenWidth: this.state.viewableScreenWidth,
                        screenHeight: this.state.viewableScreenHeight,
                        screenHeightWithHeader: this.state.viewableScreenHeightWithHeader,
                        screenOrientation: this.state.screenOrientation,
                        scale: this.state.scale,
                        fontScale: this.state.fontScale
                    })}
                </View>
            </NativeRouter>
        );
    }
}

export default Rootrn = Rootrn;
