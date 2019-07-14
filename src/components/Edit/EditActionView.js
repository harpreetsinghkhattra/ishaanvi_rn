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
import { logout } from '../../api/SocketUrls';
import { Api } from '../../api';
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

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
        const { _id: id, userAccessToken: accessToken } = User.getUserData();
        this.setState(() => ({ isLoading: true, errors: [] }), async () => {
            try {
                let res = await Api.logout(Object.keys({ id, accessToken }), { id, accessToken });

                console.log("res logout ===>", res);
                this.setState({ isLoading: false });
                if (res && res.data) {
                    this.setAlertMessageVisible(false, {});
                    User.resetUserData();
                    await UserData.removeItem(StorageKeys.USER_DATA);
                    await GoogleSignin.signOut();
                    await LoginManager.logOut();
                    Helper.resetAndPushRoot(history, routerNames.selectUserAction);
                } else if (res && res.response) {
                    // alert("Please try again in condition");
                    this.setAlertMessageVisible(false, {});
                    Helper.resetAndPushRoot(history, routerNames.selectUserAction);
                }
            } catch (error) {
                this.setState({ isLoading: false });
                // alert("Please try again while catch error");
                this.setAlertMessageVisible(false, {});
                Helper.resetAndPushRoot(history, routerNames.selectUserAction);
            }
        });
    }

    onDecline = () => {
        this.setAlertMessageVisible(false, {});
    }

    render() {
        const { stretch } = styles;
        const { alertMessageVisible, alertMessage, isLoading } = this.state;
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
                        onPress={this.openScreen.bind(this, routerNames.viewPortal, { screenType: "edit", userId: User.getUserData()._id })}
                        label={"View Portal"} />
                }
                <LabelWithRightBtn
                    onPress={this.openScreen.bind(this, routerNames.wishedProducts, { screenType: "edit" })}
                    label={"Wish List"} />
                {/*<LabelWithRightBtn
                    onPress={this.setAlertMessageVisible.bind(this, true, { status: "warning", heading: "Alert", message: "Comming soon..." })}
                    label={"Notifications"} />*/}
                <LabelWithRightBtn
                    onPress={isLoading ? () => { } : this.setAlertMessageVisible.bind(this, true, { status: "logout", heading: "Logout", message: "Do you really want to logout?" })}
                    label={isLoading ? "Please wait..." : "Logout"} />
            </WView>
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    }
}
