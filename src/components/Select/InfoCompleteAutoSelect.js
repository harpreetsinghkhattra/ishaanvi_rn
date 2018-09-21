import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WRow, WView, WText } from '../common';
import Palette from '../../Palette';
import { Image } from 'react-native';

export default class InfoCompleteAutoSelect extends Component {

  static propTypes = {
    index: PropTypes.number,
  }

  static defaultProps = {
    index: 1
  }

  render() {
    const { dot, line, stretch, iconStyle } = styles;
    const { index } = this.props;

    const selected = require("../../images/check.png");

    return (
      <WRow dial={5} style={[stretch]} >
        <WView dial={5} style={[dot]}>
          {index >= 1 && <Image source={selected} resizeMode="center" style={iconStyle} />}
        </WView>
        <WView margin={[0, 5]} flex style={[line]} />
        <WView dial={5} style={[dot]}>
          {index >= 2 && <Image source={selected} resizeMode="center" style={iconStyle} />}
        </WView>
        <WView margin={[0, 5]} flex style={[line]} />
        <WView dial={5} style={[dot]}>
          {index >= 3 && <Image source={selected} resizeMode="center" style={iconStyle} />}
        </WView>
      </WRow>
    )
  }
}

const styles = {
  stretch: {
    alignItems: "stretch"
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Palette.theme_color
  },
  line: {
    height: 2,
    alignSelf: 'center',
    backgroundColor: Palette.border_color
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: Palette.white
  }
}