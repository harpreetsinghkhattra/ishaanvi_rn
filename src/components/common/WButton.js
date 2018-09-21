import React from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback, Platform } from 'react-native';
import { WTouchable, WText, WSpinner, WView } from './';
import Palette from '../../Palette';

export default WButton = ({ isLoading, loadingColor, dial, flex, label, containerStyle, component, onPress, btnPadding, fontSize, margin }) => {
    return (
        <WTouchable flex={flex ? flex : 0} dial={dial} onPress={isLoading ? () => { } : onPress} style={[containerStyle]} padding={btnPadding} margin={margin}>
            {
                isLoading ?
                    <WSpinner size={"small"} color={loadingColor} />
                    :
                    component && component() ?
                        component()
                        :
                        <WText fontSize={fontSize} color={Palette.white}>{label}</WText>
            }
        </WTouchable>
    )
}

WButton.propTypes = {
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    containerStyle: PropTypes.any,
    component: PropTypes.func,
    onPress: PropTypes.func,
    btnPadding: PropTypes.array,
    dial: PropTypes.number.isRequired,
    fontSize: PropTypes.number
}

WButton.defaultProps = {
    isLoading: false
}









// <TouchableNativeFeedback onPress={isLoading ? () => { } : onPress}>
//                 <WView dial={dial} style={containerStyle} padding={btnPadding}>
//                     {
//                         isLoading ?
//                             <WSpinner />
//                             :
//                             component() ?
//                                 component()
//                                 :
//                                 <WText fontSize={fontSize} color={Palette.white}>{label}</WText>
//                     }
//                 </WView>
//             </TouchableNativeFeedback>