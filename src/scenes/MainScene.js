import React, { Component } from 'react'
import { InteractionManager, ToastAndroid, Alert } from 'react-native'
import PropTypes from "prop-types";
import { Route, Switch, Router } from 'react-router-native'
import { routes, routerNames } from '../RouteConfig';
import { createMemoryHistory } from 'history';

import {
    TouchableOpacity,
    Text,
    View,
    Dimensions,
    Image,
    StatusBar,
    ScrollView,
    BackHandler,
    AppState,
    NativeModules,
    Linking,
    Platform
} from 'react-native'

const history = createMemoryHistory({
    keyLength: 24
});

/**
 * Auth purpose
 */
class Main extends Component {

    constructor(props) {
        super(props)
        this.is_mounted = false;
        this.routes = {};
    }

    openScreen(path, data) {
        const { history } = this.routes;

        history.push(path, data ? data : {});
    }

    closeSplashScreen() {
        if (Platform.OS === "android") {
            NativeModules.AndroidCommon.closeSplashScreen();
        }
    }

    _handleDeepLinkingUrl = (data) => {
        const url = data && data.url ? data.url : data;

        console.log("url ===> mainscene", url);
        if (url) {

            this.closeSplashScreen();
            if (url.indexOf('product') > -1) {
                var param = url.split('/share/')[1].replace('product/', '');
                if (param.length !== 24) return;
                this.openScreen(routerNames.view_product, { productId: param })
            }

            if (url.indexOf('shop') > -1) {
                var param = url.split('/share/')[1].replace('shop/', '');
                if (param.length !== 24) return;
                this.openScreen(routerNames.viewPortal, { userId: param })
            }
        }
    }

    componentDidMount() {
        this.is_mounted = true;
        AppState.addEventListener('change', this._handleStateChange);
        Linking.addEventListener('url', this._handleDeepLinkingUrl.bind(this));
    }

    componentWillUnmount() {
        this.is_mounted = false;
        AppState.removeEventListener('change', this._handleStateChange);
        Linking.removeAllListeners('url');
    }

    _handleStateChange = (value) => {
        console.log("STATE CHANGE INFO ===> ", value);
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (!nextProps.isSocketConnected || nextProps.isNotificationAlertInRoot !== this.props.isNotificationAlertInRoot) {
            return false;
        }

        return true;
    }

    render() {
        return (
            <Switch>
                {
                    routes.map((route, i) => {
                        const { component: Component, path, exact } = route;
                        return (<Route
                            key={`Router-${i}`}
                            exact={exact}
                            path={path}
                            component={(rest) => {
                                this.routes = rest;
                                return (<Component {...rest} {...this.props} />);
                            }} />);
                    })
                }
            </Switch>
        )
    }
}

export default Main
