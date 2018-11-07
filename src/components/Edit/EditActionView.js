import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WView } from '../common';
import { LabelWithRightBtn } from './';
import { Switch } from 'react-native';
import { Section } from '../Label';
import { AlertMessage } from '../../scenes/Modal/'
import { Storage, StorageKeys, Helper } from '../../helper';
import { routerNames } from '../../RouteConfig';
import { User } from '../../model/user';

const UserData = new Storage();

export default class EditActionView extends Component {

    state = {
        isLoading: false,
        alertMessageVisible: false,
        alertMessage: {}
    }

    openScreen = (path, options) => {
        const { history } = this.props;
        options = options && options.screenType ? options : {};
        history.push(path, options);
    }

    setAlertMessageVisible(alertMessageVisible, alertMessage) {
        this.setState({ alertMessageVisible, alertMessage });
    }

    async onLogoutAccept() {
        const { history } = this.props;

        this.setAlertMessageVisible(false, {});
        User.resetUserData();
        await UserData.removeItem(StorageKeys.USER_DATA);
        Helper.resetAndPushRoot(history, routerNames.selectUserAction);
    }

    onDecline = () => {
        this.setAlertMessageVisible(false, {});
    }

    render() {
        const { stretch } = styles;
        const { alertMessageVisible, alertMessage } = this.state;
        const { userType } = User.getUserData();

        return (
            <WView dial={5} padding={[10, 0]} style={[stretch]}>
                <AlertMessage
                    isVisible={alertMessageVisible}
                    data={alertMessage}
                    label1={"Yes"}
                    label2={"No"}
                    onAccept={() => this.onLogoutAccept()}
                    onDecline={this.setAlertMessageVisible.bind(this, false, {})}
                    {...this.props}
                    setVisible={this.setAlertMessageVisible.bind(this, false)} />
                <Section
                    label={"Actions"} />
                <LabelWithRightBtn
                    onPress={this.openScreen.bind(this, User.getUserData().userType === 1 ? routerNames.registerSellerSelectCategory : routerNames.edit_user_profile, { screenType: "edit" })}
                    label={"Edit User"} />
                <LabelWithRightBtn
                    onPress={this.openScreen.bind(this, routerNames.resetPassword, { screenType: "edit" })}
                    label={"Edit Password"} />
                {
                    userType === 1 &&
                    <LabelWithRightBtn
                        onPress={this.openScreen.bind(this, routerNames.post_offer_list, { screenType: "edit" })}
                        label={"Selling Board"} />
                }
                {
                    userType === 1 &&
                    <LabelWithRightBtn
                        label={"View Portal"} />
                }
                <LabelWithRightBtn
                    label={"Notifications"} />
                <LabelWithRightBtn
                    onPress={this.setAlertMessageVisible.bind(this, true, { status: "logout", heading: "Logout", message: "Do you really want to logout?" })}
                    label={"Logout"} />
            </WView>
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    }
}
