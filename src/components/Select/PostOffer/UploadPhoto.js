import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WText, WView, WRow } from '../../common'
import { SelectImage, SelectedImagesList } from './'
import Palette from '../../../Palette';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { User } from '../../../model/user';
import { ProgressBar } from '../../Edit/';
import { PostOffer } from '../../../model/PostOffer';

export default class UploadPhoto extends Component {

  state = {
    images: []
  }

  static propTypes = {
    onPress: PropTypes.func
  }

  componentDidMount = () => {
    const { photos } = PostOffer.getData();
    this.setState({ images: photos && photos.length ? photos : [] });
  }


  getImageFromCamera = () => {
    const { onPhotosSelect } = this.props;

    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo'
    }).then(images => {
      var images = images.map(ele => ele.path);

      this.setState(prevState => {
        prevState.images = prevState.images.concat(images);
        prevState.images.reverse();
        prevState.images = prevState.images.slice(0, 5);

        onPhotosSelect(prevState.images);
        return ({ images: prevState.images });
      });
    });
  }

  deleteImage = (index) => {
    const { images } = this.state;
    const { onPhotosSelect } = this.props;

    if (index > -1) {
      this.setState(prevState => {
        prevState.images.splice(index, 1);

        onPhotosSelect(prevState.images && prevState.images.length ? prevState.images : []);
        return ({ images: prevState.images && prevState.images.length ? prevState.images : [] })
      })
    }
  }

  render() {
    const { container } = styles;
    const { images } = this.state;

    return (
      <WView dial={5} style={container}>
        <SelectedImagesList
          data={images}
          deleteImage={this.deleteImage.bind(this)}
          heading="Test" />
        <SelectImage
          imageCount={images && 5 - images.length}
          onPress={this.getImageFromCamera.bind(this)}
        />
      </WView>
    )
  }
}

const styles = {
  container: {
    alignItems: 'stretch'
  }
}