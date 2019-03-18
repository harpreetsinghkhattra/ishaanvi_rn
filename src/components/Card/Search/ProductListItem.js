import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WView, WRow, WTouchable, WText } from '../../common'
import { ProductImage } from '.';
import { Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Palette from '../../../Palette';
import { routerNames } from '../../../RouteConfig';

const ProductListItem = (props) => {
    const { data, width, onItemPress } = props;
    const { price, discount, images, _id, views, rating } = data;

    const openScreen = (path, data) => {
        const { history } = props;

        history.push(path, data ? data : {});
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={
                [props.spaced
                    ? { ...styles.container, ...styles.containerSpacing }
                    : styles.container,
                { width }
                ]
            }
            onPress={() => onItemPress(_id)}
            underlayColor="#EFF1F5"
        >
            <View>
                <View style={styles.imageContainer}>
                    <ProductImage
                        source={images && images.length ? { uri: images[0] } : require('../../../images/profile.png')}
                        width={width} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 5, bottom: 10, backgroundColor: Palette.line_color }}>
                        <Text style={{ fontSize: 12, paddingVertical: 3, paddingHorizontal: 10 }}>{`${discount}% OFF`}</Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.price}>
                        {`₹ ${parseFloat(price).toFixed(2)} `}
                        <Text style={[{
                            textDecorationLine: 'line-through', paddingHorizontal: 10,
                            color: Palette.border_color
                        }]}>
                            {`₹ ${parseFloat((parseFloat(price) - (parseFloat(discount) / 100) * parseFloat(price))).toFixed(2)}`}
                        </Text>
                    </Text>
                    {/*<Text numberOfLines={2} style={styles.title}>
                        {"Got it this is a test product"}
                    </Text>*/}

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'green'
                        }}>
                            <View style={{
                                paddingHorizontal: 5,
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: Palette.white
                                }}>{rating ? parseFloat(rating).toFixed(1) : 0}</Text>
                            </View>
                            <View style={{ paddingRight: 5 }}>
                                <Image
                                    source={require('../../../images/star.png')}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: Palette.white
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{
                            borderRightWidth: 1,
                            borderColor: Palette.line_color,
                            borderStyle: 'solid',
                            marginHorizontal: 5,
                            height: 10
                        }} />
                        <View style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: Palette.line_color
                        }}>
                            <View style={{
                                paddingHorizontal: 5,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: Palette.text_color
                                }}>{views ? views : 0}</Text>
                            </View>
                            <View style={{ paddingRight: 5 }}>
                                <Image
                                    source={require('../../../images/show_password.png')}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: Palette.text_color
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    container: {
        borderColor: "#F7F7F7",
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    containerSpacing: {
        marginRight: 15,
        marginTop: 5
    },
    imageContainer: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: "hidden"
    },
    textContainer: {
        padding: 8
    },
    image: {

    },
    price: {
        fontFamily: "LatoBlack",
        fontSize: 14,
        color: "#000"
    },
    title: {
        fontFamily: "AvenirMedium",
        fontSize: 12,
        color: "#5F5F5F",
        marginTop: 5
    }
};

export default ProductListItem;
