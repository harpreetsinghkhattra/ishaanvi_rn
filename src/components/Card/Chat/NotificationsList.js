import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, StyleSheet, Image } from 'react-native'
import { WRow, WView, WText, WSpinner, WTouchable } from '../../common'
import Palette from '../../../Palette'
import { EventNotificationinfo } from '../../../scenes/Modal'

export default class NotificationsList extends PureComponent {

    static propTypes = {

    }

    state = {
        data: [1, 2, 3, 4, 5, 6],
        isLoading: false,
        alertMessageVisible: false
    }

    setAlertMessageVisible(alertMessageVisible) {
        this.setState({ alertMessageVisible });
    }

    /** Render item */
    renderItem = () => {
        const { container, iconStyle, iconContainer } = styles;
        const { screenWidth } = this.props;

        return (
            <WTouchable dial={5} style={{ width: screenWidth, height: 80 }} onPress={this.setAlertMessageVisible.bind(this, true)}>
                <WRow dial={5} margin={[0, 5, 5, 5]} padding={[5, 0]} style={container}>
                    <WView dial={5} style={iconContainer} backgroundColor={Palette.theme_color}>
                        <Image source={require('../../../images/speaker.png')} style={iconStyle} />
                    </WView>
                    <WView dial={4} flex>
                        <WText fontSize={14} color={Palette.black} fontFamily={'Muli-Bold'}>Flex Formation Fitness & Family Fun uploaded: About my work 2016-2017 Where i teach bootcamps Behind the scenes</WText>
                        <WText fontSize={14} color={Palette.border_color}>Flex Formation Fitness & Family Fun uploaded: About my work 2016-2017 Where i teach bootcamps Behind the scenes</WText>
                        <WText fontFamily={'Muli-Bold'} color={Palette.black} >1 minute ago</WText>
                    </WView>
                </WRow>
            </WTouchable>
        );
    }

    render() {
        const { data, isLoading, alertMessageVisible } = this.state;
        const { screenWidth } = this.props;

        if (!isLoading && data && !data.length)
            return (
                <WView dial={5} flex>
                    <Image
                        source={require("../../../images/noNotifications.png")}
                        containerStyle={{ width: screenWidth / 2 }}
                    />
                </WView>
            );

        return (
            <FlatList
                keyExtractor={(item, index) => `notifications-${index}`}
                ListHeaderComponent={
                    isLoading ?
                        <WView dial={5}>
                            <WSpinner size={"small"} color={Palette.theme_color} />
                        </WView> : null

                }
                ListFooterComponent={
                    <EventNotificationinfo
                        {...this.props}
                        isVisible={alertMessageVisible}
                        title={"Hello one title"}
                        description={"Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd, Description lkajdf klaj dfkaldsjfakld jfaklsdj faklsd fjaklsdj fkalsdj fklasdj fklasdj fakld jfkalsdj fsakd fjaskldjfslkdjf dasdsd"}
                        setVisible={this.setAlertMessageVisible.bind(this, false)}
                    />
                }
                data={data}
                style={{ flexGrow: 1, marginBottom: 60 }}
                renderItem={this.renderItem} />
        )
    }
}

const styles = {
    container: {
        borderColor: Palette.line_color,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderStyle: 'solid'
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    iconStyle: {
        width: 30,
        height: 30,
        tintColor: Palette.white
    }
}
