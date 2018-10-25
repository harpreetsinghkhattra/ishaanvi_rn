import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WView } from '../common';
import { Section, WithInfo } from '../Label';

export default class UserInfo extends Component {
    static propTypes = {
        userData: PropTypes.object
    }

    _sellerUserInfo = () => {
        const { userData } = this.props;
        const { category, business_address, business_name, name, email, mobile_number } = userData;
        const { stretch } = styles;

        return (
            <WView padding={[10, 0]} dial={5} style={[stretch]}>
                <Section
                    label={"Category"} />

                <WithInfo
                    label={"Category"}
                    padding={[5, 10]}
                    value={category} />

                <Section
                    label={"Buisness Info"} />
                <WithInfo
                    label={"Name"}
                    padding={[5, 10]}
                    value={business_name} />
                <WithInfo
                    label={"Address"}
                    padding={[5, 10]}
                    value={business_address} />

                <Section
                    label={"Contact Info"} />
                <WithInfo
                    label={"Name"}
                    padding={[5, 10]}
                    value={name} />
                <WithInfo
                    label={"Email"}
                    padding={[5, 10]}
                    value={email} />
                <WithInfo
                    label={"Mobile Number"}
                    padding={[5, 10]}
                    value={mobile_number} />
            </WView>
        );
    }

    _userInfo = () => {
        const { userData } = this.props;
        const { address, name, email, mobile_number } = userData;
        const { stretch } = styles;

        return (
            <WView padding={[10, 0]} dial={5} style={[stretch]}>
                <Section
                    label={"User Info"} />
                {
                    name ?
                        <WithInfo
                            label={"Name"}
                            padding={[5, 10]}
                            value={name} />
                        : null
                }
                <WithInfo
                    label={"Email"}
                    padding={[5, 10]}
                    value={email} />
                {
                    mobile_number ?
                        <WithInfo
                            label={"Mobile Number"}
                            padding={[5, 10]}
                            value={mobile_number} />
                        : null
                }
                {
                    address ?
                        <WithInfo
                            label={"Location"}
                            padding={[5, 10]}
                            value={address} />
                        : null
                }
            </WView>
        );
    }

    render() {
        const { userData } = this.props;
        const { userType } = userData;

        return (
            userType === 1 ?
                this._sellerUserInfo()
                :
                this._userInfo()
        );
    }
}

const styles = {
    stretch: {
        alignItems: "stretch"
    }
}
