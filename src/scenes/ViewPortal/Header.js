import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { WView, WRow, WTouchable, WText } from '../../components/common'
import { WithLeftIcon } from '../../components/UI/btn'
import Palette from '../../Palette'

export default class Header extends PureComponent {

    static propTypes = {
        onBack: PropTypes.func,
        isLoading: PropTypes.bool,
        data: PropTypes.object
    }

    Btn = ({ iconPath, onPress }) =>
        <WTouchable dial={5} margin={[5, 2]} onPress={onPress} style={styles.iconContainer}>
            <Image source={iconPath} style={styles.iconStyle} />
        </WTouchable>

    render() {
        const back = require('../../images/back.png');
        const message = require('../../images/message.png');
        const phone = require('../../images/phone.png');
        const share = require('../../images/share1.png');
        const { onBack, isLoading, data } = this.props;

        return (
            <WView dial={5} style={{ alignItems: 'stretch' }} padding={[5, 10]}>
                <WRow dial={5}>
                    <WTouchable onPress={onBack} dial={4} padding={[5, 0]}>
                        <Image source={back} style={{ width: 20, height: 20, tintColor: Palette.black }} />
                    </WTouchable>
                    <WView dial={5} flex>
                        <WText weight={"500"} fontSize={16}>RAVI GARMENTS</WText>
                    </WView>
                </WRow>
                <WRow dial={5}>
                    <WView dial={5} flex>
                        <Image source={require("../../images/no_product.png")} style={{ width: 80, height: 80, borderRadius: 40 }} />
                        <WText>Owner Name</WText>
                    </WView>
                    <WView dial={5} flex={2}>
                        <WRow dial={5}>
                            <WView dial={5} flex>
                                <WText center>754</WText>
                                <WText center>Followers</WText>
                            </WView>
                            <WView dial={5} flex>
                                <WText center>966</WText>
                                <WText center>Following</WText>
                            </WView>
                        </WRow>
                        <WithLeftIcon
                            label="Follow"
                            onPress={() => { }}
                            iconStyle={{ width: 18, height: 18, tintColor: Palette.white }}
                            iconPath={require("../../images/followUser.png")}
                            style={{ marginBottom: 10, flex: 1 }}
                        />
                    </WView>
                </WRow>
                <WRow dial={5}>
                    <WRow dial={4} flex>
                        <Image source={require('../../images/location.png')} style={{ width: 20, height: 20 }} />
                        <WText lines={3}>24-27 South Molton Street</WText>
                    </WRow>
                    <WRow dial={5} flex>
                        <this.Btn onPress={() => { }} iconPath={phone} />
                        <this.Btn onPress={() => { }} iconPath={message} />
                        <this.Btn onPress={() => { }} iconPath={share} />
                    </WRow>
                </WRow>
            </WView>
        )
    }
}

const styles = {
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Palette.theme_color,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    iconStyle: { width: 15, height: 15, tintColor: Palette.white }
}