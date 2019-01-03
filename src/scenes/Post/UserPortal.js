// import React, { Component } from 'react';
// import {
//   Animated,
//   Platform,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   RefreshControl,
// } from 'react-native';
// import ViewPortal from '../ViewPortal';

// const HEADER_MAX_HEIGHT = 300;
// const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       scrollY: new Animated.Value(
//         // iOS has negative initial scroll value because content inset...
//         Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
//       ),
//       refreshing: false,
//     };
//   }

//   _renderScrollViewContent() {
//     const data = Array.from({ length: 30 });
//     return (
//       <View style={styles.scrollViewContent}>
//         {/*{data.map((_, i) => (
//           <View key={i} style={styles.row}>
//             <Text>{i}</Text>
//           </View>
//         ))}*/}
//         <ViewPortal {...this.props} />
//       </View>
//     );
//   }

//   render() {
//     // Because of content inset the scroll value will be negative on iOS so bring
//     // it back to 0.
//     const scrollY = Animated.add(
//       this.state.scrollY,
//       Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
//     );
//     const headerTranslate = scrollY.interpolate({
//       inputRange: [0, HEADER_SCROLL_DISTANCE],
//       outputRange: [0, -HEADER_SCROLL_DISTANCE],
//       extrapolate: 'clamp',
//     });

//     const imageOpacity = scrollY.interpolate({
//       inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
//       outputRange: [1, 1, 0],
//       extrapolate: 'clamp',
//     });
//     const imageTranslate = scrollY.interpolate({
//       inputRange: [0, HEADER_SCROLL_DISTANCE],
//       outputRange: [0, 100],
//       extrapolate: 'clamp',
//     });

//     const titleScale = scrollY.interpolate({
//       inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
//       outputRange: [1, 1, 0.8],
//       extrapolate: 'clamp',
//     });
//     const titleTranslate = scrollY.interpolate({
//       inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
//       outputRange: [0, 0, -8],
//       extrapolate: 'clamp',
//     });

//     return (
//       <View style={styles.fill}>
//         <StatusBar
//           translucent
//           barStyle="light-content"
//           backgroundColor="rgba(0, 0, 0, 0.251)"
//         />
//         <Animated.ScrollView
//           style={styles.fill}
//           scrollEventThrottle={1}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
//             { useNativeDriver: true },
//           )}
//           refreshControl={
//             <RefreshControl
//               refreshing={this.state.refreshing}
//               onRefresh={() => {
//                 this.setState({ refreshing: true });
//                 setTimeout(() => this.setState({ refreshing: false }), 1000);
//               }}
//               // Android offset for RefreshControl
//               progressViewOffset={HEADER_MAX_HEIGHT}
//             />
//           }
//           // iOS offset for RefreshControl
//           contentInset={{
//             top: HEADER_MAX_HEIGHT,
//           }}
//           contentOffset={{
//             y: -HEADER_MAX_HEIGHT,
//           }}
//         >
//           {this._renderScrollViewContent()}
//         </Animated.ScrollView>
//         <Animated.View
//           pointerEvents="none"
//           style={[
//             styles.header,
//             { transform: [{ translateY: headerTranslate }] },
//           ]}
//         >
//           <Animated.Image
//             style={[
//               styles.backgroundImage,
//               {
//                 opacity: imageOpacity,
//                 transform: [{ translateY: imageTranslate }],
//               },
//             ]}
//             source={require('../../images/product-dummy.png')}
//           />

//         </Animated.View>
//         <Animated.View
//           style={[
//             styles.bar,
//             {
//               transform: [
//                 { scale: titleScale },
//                 { translateY: titleTranslate },
//               ],
//             },
//           ]}
//         >
//           <Text style={styles.title}>Title</Text>
//         </Animated.View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   fill: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//   },
//   header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#03A9F4',
//     overflow: 'hidden',
//     height: HEADER_MAX_HEIGHT,
//   },
//   backgroundImage: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     width: null,
//     height: HEADER_MAX_HEIGHT,
//     resizeMode: 'cover',
//   },
//   bar: {
//     backgroundColor: 'transparent',
//     marginTop: Platform.OS === 'ios' ? 28 : 38,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//   },
//   title: {
//     color: 'white',
//     fontSize: 18,
//   },
//   scrollViewContent: {
//     // iOS uses content inset, which acts like padding.
//     paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
//   },
//   row: {
//     height: 40,
//     margin: 16,
//     backgroundColor: '#D3D3D3',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { Component } from 'react'
import { WView, WText, WRow, WTextInput, WSpinner } from '../../components/common';
import { ScrollView, PixelRatio } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import ViewPortal from '../ViewPortal';
import Header from '../ViewPortal/Header';
import { userPortal } from '../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../api';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userData: {}
    };

    this._isMounted = false;
  }

  componentDidMount = () => {
    this.getUserResponse();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _setState = (value, cb) => {
    if (cb) this.setState(value, cb);
    else this.setState(value);
  }


  /** On back */
  onBack = () => {
    const { history, location } = this.props;

    if (location.state && location.state.screenType === "home")
      history.replace(routerNames.index, { selectedIndex: 0 })
    else history.go(-1);
  }

  getUserResponse() {
    const { _id: id, userAccessToken: accessToken, filterData } = User.getUserData();
    Socket.request(userPortal.emit, {
      id,
      accessToken,
      "userId": id
    });

    UserApi.getSocketResponseOnce(userPortal.on, (res) => {
      if (res && res.message === "Success") {
        this._setState({ isLoading: false, userData: res.data && res.data.length ? res.data[0] : {} });
      } else this._setState({ isLoading: false });
    });
  }

  componentDidMount = () => {
    this.getUserResponse();
  }

  render() {
    const { screenWidth, screenHeightWithHeader, history } = this.props;
    const { stretch, btnStyle, btnContainer, border } = styles;
    const { isLoading, userData } = this.state;

    if (isLoading)
      return (
        <WView dial={5} flex style={stretch}>
          <WView dial={5}>
            <WSpinner color={Palette.theme_color} />
            <WText color={Palette.theme_color} padding={[5, 0]} fontFamily="Muli-Bold">Please wait...</WText>
          </WView>
        </WView >
      );

    return (
      <WView dial={2} flex style={stretch}>
        <Header
          isLoading={isLoading}
          data={userData}
          onBack={this.onBack.bind(this)} />
        <ViewPortal {...this.props} />
      </WView >
    );
  }
}

const styles = {
  stretch: {
    alignItems: 'stretch'
  },
  btnStyle: {
    backgroundColor: Palette.create_add_continue_btn,
    alignSelf: "stretch",
    height: 52,
    borderRadius: 5
  },
  btnContainer: {
    height: 74
  },
  border: {
    borderStyle: "solid",
    borderBottomWidth: (5 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
    borderColor: Palette.theme_color
  }
}
