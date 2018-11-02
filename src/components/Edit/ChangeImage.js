// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { WView, WText, Image } from '../common';
// import Palette from '../../Palette';
// import ImagePicker from 'react-native-image-picker';
// import axios from 'axios';
// import { User } from '../../model/user';
// import { ProgressBar } from './';

// export default class ChangeImage extends Component {
//     static propTypes = {
//         onPress: PropTypes.func,
//         imageSource: PropTypes.any
//     }

//     state = {
//         selectedImage: "",
//         percentage: 0,
//         uploadingImage: false
//     }

//     getImageFromCamera = () => {

//         const { _id: id, userAccessToken: accessToken } = User.getUserData();

//         const options = {
//             title: 'Choose your profile pic',
//             mediaType: 'photo',
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'images',
//             },
//         };

//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);

//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 const source = { uri: response.uri };

//                 // You can also display the image using data:
//                 // const source = { uri: 'data:image/jpeg;base64,' + response.data };

//                 this.setState({
//                     selectedImage: source,
//                 });

//                 var formData = new FormData();
//                 formData.append('file', {
//                     uri: source.uri,
//                     type: 'image/png',
//                     name: 'photo'
//                 });
//                 formData.append('id', id);
//                 formData.append('accessToken', accessToken);

//                 this.setState({ uploadingImage: true });
//                 axios.post('http://13.127.188.164/api/editProfileImage', formData, {
//                     onUploadProgress: (percentage) => {
//                         this.setState({
//                             percentage: Math.round((percentage.loaded * 100) / percentage.total)
//                         })
//                     }
//                 }).then((res) => {
//                     this.setState({ uploadingImage: false });
//                     if (res && res.data && res.data.message === "Success") {
//                         User.setUserData(res.data.data);
//                     } else alert(JSON.stringify(res));
//                 });

//             }
//         });
//     }

//     render() {
//         const { onPress, imageSource } = this.props;
//         const { image } = styles;
//         const { selectedImage, percentage, uploadingImage } = this.state;

//         return (
//             <WView dial={5} padding={[20, 0]}>
//                 <Image source={selectedImage ? selectedImage : imageSource} imageStyle={image} />
//                 {
//                     uploadingImage &&
//                     <ProgressBar
//                         percentage={percentage}
//                         width={100}
//                     />
//                 }
//                 <WText onPress={this.getImageFromCamera.bind(this)} lines={100} padding={[5, 10]} color={Palette.theme_color} fontSize={14} fontFamily={"Muli-Bold"}>Change Image</WText>
//             </WView>
//         )
//     }
// }

// const styles = {
//     image: {
//         width: 80,
//         height: 80,
//         borderRadius: 40
//     }
// }




import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WView, WText, Image } from '../common';
import Palette from '../../Palette';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { User } from '../../model/user';
import { ProgressBar } from './';

export default class ChangeImage extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        imageSource: PropTypes.any
    }

    state = {
        selectedImage: "",
        percentage: 0,
        uploadingImage: false
    }

    getImageFromCamera = () => {

        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        const options = {
            title: 'Choose your profile pic',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    selectedImage: source,
                });

                var formData = new FormData();
                formData.append('file', {
                    uri: source.uri,
                    type: 'image/png',
                    name: 'photo'
                });
                formData.append('id', id);
                formData.append('accessToken', accessToken);

                this.setState({ uploadingImage: true });
                axios.post('http://13.127.188.164/api/editProfileImage', formData, {
                    onUploadProgress: (percentage) => {
                        this.setState({
                            percentage: Math.round((percentage.loaded * 100) / percentage.total)
                        })
                    }
                }).then((res) => {
                    this.setState({ uploadingImage: false });
                    if (res && res.data && res.data.message === "Success") {
                        User.setUserData(res.data.data);
                    } else alert(JSON.stringify(res));
                });

            }
        });
    }

    render() {
        const { onPress, imageSource, isLoading } = this.props;
        const { image } = styles;
        const { selectedImage, percentage, uploadingImage } = this.state;

        return (
            <WView dial={5} padding={[20, 0]}>
                {!isLoading ? <Image source={selectedImage ? selectedImage : imageSource} imageStyle={image} /> : null}
                {
                    uploadingImage &&
                    <ProgressBar
                        percentage={percentage}
                        width={100}
                    />
                }
                {!isLoading ? <WText onPress={this.getImageFromCamera.bind(this)} lines={100} padding={[5, 10]} color={Palette.theme_color} fontSize={14} fontFamily={"Muli-Bold"}>Change Image</WText> : null}
            </WView>
        )
    }
}

const styles = {
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    }
}