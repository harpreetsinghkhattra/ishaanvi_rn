import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WView, WText } from '../../common'
import Palette from '../../../Palette'
import { Api, Socket, User as UserApi } from '../../../api';

export default class ConnectionInfo extends PureComponent {

    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            isShowAlert: false,
            response: {
                status: '',
                message: ''
            }
        }

        this._isMounted = true;
        this.init();
        this.interval = undefined;
        this.connectStatus = "";
    }

    showMessage = (status) => {
        const { onSocketConnectionStatusChange } = this.props;
        if (this.connectStatus === status) return;

        this.connectStatus === status;
        if (status === "offline") {
            this.resetInterval();
            this._setState({
                isShowAlert: true,
                response: {
                    message: "Offline",
                    status: "offline"
                }
            });
            onSocketConnectionStatusChange && onSocketConnectionStatusChange(false);
            return;
        }

        this._setState({
            isShowAlert: true,
            response: {
                message: "Back Online",
                status: "online"
            }
        });
        this.interval = setInterval(() => {
            this._setState({
                isShowAlert: false,
                response: {
                    message: "",
                    status: ""
                }
            });
            this.connectStatus = "";
            this.resetInterval();
        }, 3000);
        onSocketConnectionStatusChange && onSocketConnectionStatusChange(true);
    }

    resetInterval = () => {
        this.interval && clearInterval(this.interval);
        this.interval = undefined;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    _setState = (state, cb) => {
        if (!this._isMounted) return;

        if (cb) this.setState(state, cb);
        else this.setState(state);
    }

    init = () => {
        //On user connect
        UserApi.getSocketResponseOn('connect', () => {
            this.showMessage("online");
        });

        //On user disconnect
        UserApi.getSocketResponseOn('disconnect', () => {
            this.showMessage("offline");
        });
    }

    render() {
        const { isShowAlert, response } = this.state;

        if (!isShowAlert) return null;

        return (
            <WView backgroundColor={response.status === "online" ? Palette.theme_color : Palette.red} dial={5} padding={[2, 10]}>
                <WText color={Palette.white} center>{response.message}</WText>
            </WView>
        )
    }
}
