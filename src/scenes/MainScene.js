import React, { Component } from 'react'
import { InteractionManager, ToastAndroid, Alert } from 'react-native'
import PropTypes from "prop-types";
import { Route, Switch } from 'react-router-native'
import { routes } from '../RouteConfig';

import {
    TouchableOpacity,
    Text,
    View,
    Dimensions,
    Image,
    StatusBar,
    ScrollView,
    BackHandler
} from 'react-native'

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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.is_mounted = false;
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress(state) {
        // if (!state) {
        //     Alert.alert("App", "Do you really want to exit?", [
        //         {
        //             text: "Cancel"
        //         }, {
        //             text: "OK",
        //             onPress: () => {
        //                 BackHandler.exitApp();
        //             }
        //         }
        //     ]);
        //     return true;
        // } 
    }

    shouldComponentUpdate = (nextProps, nextState) => {
      console.log("shouldUpdate", this.routes);

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
                                this.handleBackPress(rest);
                                return (<Component {...rest} {...this.props} />);
                            }} />);
                    })
                }
            </Switch>
        )
    }
}

export default Main
