import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WRow, WView, WText, WTouchable } from '../../common'
import Palette from '../../../Palette'
import { Image } from 'react-native'

export default class SelectImage extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    imageCount: PropTypes.number
  }

  render() {
    const { onPress, imageCount } = this.props;
    const { container, image, btnContainer } = styles;

    return (
      <WView dial={5} style={container}>
        {imageCount > 0 && <WText fontFamily={"Muli-Bold"} fontSize={18}>{`Add upto ${imageCount} ${imageCount === 1 ? 'photo' : 'photos'} ${imageCount >= 5 ? '' : 'more'} (optional)`}</WText>}
        <WTouchable dial={5} onPress={onPress} style={btnContainer}>
          <Image source={require("../../../images/camera_icon.png")} style={image} />
        </WTouchable>
      </WView>
    )
  }
}

const styles = {
  container: {
    alignSelf: 'stretch'
  },
  image: {
    width: 30,
    height: 30,
    tintColor: Palette.white
  },
  btnContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: Palette.theme_color
  }
}