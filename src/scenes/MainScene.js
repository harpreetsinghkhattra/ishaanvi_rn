import React, { Component } from 'react'
import { InteractionManager, ToastAndroid, Alert } from 'react-native'
import PropTypes from "prop-types";
import { Route, Switch, Router } from 'react-router-native'
import { routes } from '../RouteConfig';
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
    AppState
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

    componentDidMount() {
        this.is_mounted = true;
        AppState.addEventListener('change', this._handleStateChange);
    }

    componentWillUnmount() {
        this.is_mounted = false;
        AppState.removeEventListener('change', this._handleStateChange);
    }

    _handleStateChange = (value) => {
        console.log("STATE CHANGE INFO ===> ", value);
    }

    render() {
        return (
            <Router history={history}>
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
            </Router>
        )
    }
}

export default Main
