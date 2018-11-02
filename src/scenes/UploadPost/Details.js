import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { ChangeImage, EditActionView, UserInfo } from '../../components/Edit';
import { User } from '../../model/user';
import { Storage, StorageKeys } from '../../helper';
import { CompleteIndicatorStatus, UploadPhoto } from '../../components/Select/PostOffer';
import { TextInputWithLabel, MultiTextInputWithLabel } from '../../components/UI/input';
import { Section } from '../../components/Label';
import { SelectProductTypeList } from '../../components/Lists';
import { PostOffer } from '../../model/PostOffer';

import { Api, Socket, User as UserApi } from '../../api';
import { AlertMessage, AutoComplete } from '../Modal/';
import { add_product, edit_product } from '../../api/SocketUrls';

const UserData = new Storage();
const BOTTOM_STATUS_BAR = 56;

export default class Details extends Component {

    state = {
        isLoading: false,
        userData: {},
        formData: {},
        errors: [],
        alertMessageVisible: false,
        alertMessage: {}
    }

    componentWillMount = () => {
        this.init();

        const { photos, ...rest } = PostOffer.getData();
        this.setState({ formData: { ...rest }, userData: User.getUserData() });
    }

    init = () => {
        const { history, location } = this.props;
        const { screenType, item } = location.state;

        if (screenType === "edit") {
            const { name, size, color, description, price, discount, itemCode, material, occasion, type, selectType, category, images, status } = item;

            PostOffer.setData({
                itemCode,
                name,
                size,
                color,
                description,
                price,
                discount,
                material,
                occasion,
                type,
                selectType,
                category,
                status,
                deletedStatus: '0',
                photos: images && images.length ? images : []
            });
        } 
    }

    /** On change */
    onTextChange = (key, value) => {
        PostOffer.setData({ [key]: value });
        this.setState(prevState => {
            var formData = prevState.formData;
            formData[key] = value;

            return ({ formData });
        });
    }

    /** Get response */
    getAddProductResponse = () => {
        const { history } = this.props;

        UserApi.getSocketResponseOnce(add_product.on, (res) => {
            this.setState({ isLoading: false });
            if (res && res.data) {
                if (res.message === "Success") {
                    history.push(routerNames.post_offer_photos, {})
                } else if (res.message === "Present") this.setAlertMessageVisible(true, { status: res.message, heading: "Product is Present!", message: "Please try with another item code" });
                else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" })
            } else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" })
        });
    }

    /** Get response edit */
    getEditProductResponse = () => {
        const { history } = this.props;

        UserApi.getSocketResponseOnce(edit_product.on, (res) => {
            this.setState({ isLoading: false });
            if (res && res.data) {
                if (res.message === "Success") {
                    history.push(routerNames.post_offer_photos, { screenType: 'edit' });
                } else if (res.message === "Present") this.setAlertMessageVisible(true, { status: res.message, heading: "Product is Present!", message: "Please try with another item code" });
                else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" })
            } else this.setAlertMessageVisible(true, { status: res.message, heading: "Internal Error!", message: "Please try again" })
        });
    }

    /** On submit */
    sumbit = () => {
        const { history, location } = this.props;
        const { screenType, item } = location.state;
        const { photos, status, deletedStatus, ...rest } = PostOffer.getData();
        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        if (screenType === "edit") {
            this.setState(() => ({ isLoading: true, errors: [] }), () => {
                Api.isValidForm(Object.keys(Object.assign({ ...rest }, { status, deletedStatus })), Object.assign({ ...rest }, { status, deletedStatus }))
                    .then(res => {
                        if (res && res.message) {
                            if (res.message === "Success") {
                                Socket.request(edit_product.emit, Object.assign({ ...rest }, { id, accessToken, status, deletedStatus }));
                                this.getEditProductResponse();
                            } else Alert.alert("", res.message);
                        } else if (res && res.response) {
                            const { status, response } = res;
                            this.setState({ isLoading: false, errors: response && response.length ? response : [] });
                        }
                    })
                    .catch(err => console.log(err));
            });
        } else {
            this.setState(() => ({ isLoading: true, errors: [] }), () => {
                Api.isValidForm(Object.keys({ ...rest }), { ...rest })
                    .then(res => {
                        if (res && res.message) {
                            if (res.message === "Success") {
                                Socket.request(add_product.emit, Object.assign({ ...rest }, { id, accessToken }));
                                this.getAddProductResponse();
                            } else Alert.alert("", res.message);
                        } else if (res && res.response) {
                            const { status, response } = res;
                            this.setState({ isLoading: false, errors: response && response.length ? response : [] });
                        }
                    })
                    .catch(err => console.log(err));
            });
        }
    }

    /** On error */
    isError = (key) => {
        const { errors } = this.state;
        console.log(errors);

        if (errors && errors.length) {
            return errors.findIndex(ele => (ele.fieldName === key)) > -1 ? { status: true, message: errors[errors.findIndex(ele => (ele.fieldName === key))].message } : { status: false, message: "" };
        } else return { status: false, message: "" }
    }

    setAlertMessageVisible(alertMessageVisible, alertMessage) {
        this.setState({ alertMessageVisible, alertMessage });
    }

    back = () => {
        const { history } = this.props;
        history.goBack();
        PostOffer.resetData();
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history, location } = this.props;
        const { stretch, btnStyle, btnContainer, border } = styles;
        const { userData, formData, alertMessage, alertMessageVisible, isLoading } = this.state;
        const { name, itemCode, category, color, description, discount, material, occasion, type, selectType, price, size } = formData;

        const { screenType, item } = location.state;

        return (
            <WView dial={2} flex style={stretch}>
                <Header
                    onPress={this.back.bind(this)}
                    label={screenType === "edit" ? "Edit Product" : "Product Details"}
                />
                <AlertMessage
                    isVisible={alertMessageVisible}
                    data={alertMessage}
                    {...this.props}
                    setVisible={this.setAlertMessageVisible.bind(this, false)} />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader - BOTTOM_STATUS_BAR, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={2} padding={[5, 5]} style={[stretch, { justifyContent: 'space-between' }]} >
                        <WView flex dial={2} style={[stretch]}>
                            <Section
                                label={"Basics"} />
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Name *"
                                placeholderName={"e.g. Goggles"}
                                isError={this.isError('name')}
                                value={name}
                                onChangeText={value => this.onTextChange("name", value)}
                                getFocus={ref => this.input1 = ref}
                                onSubmitEditing={() => this.input2 && this.input2.focus()}
                            />
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Item Code *"
                                placeholderName={"e.g. 10001"}
                                editable={screenType === "edit" ? true : false}
                                isError={this.isError('itemCode')}
                                value={itemCode}
                                onChangeText={value => this.onTextChange("itemCode", value)}
                                getFocus={ref => this.input2 = ref}
                                onSubmitEditing={() => this.input3 && this.input3.focus()}
                            />
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Size *"
                                placeholderName={"e.g. 12 inches"}
                                isError={this.isError('size')}
                                keyboardType={'numeric'}
                                value={size}
                                onChangeText={value => this.onTextChange("size", value)}
                                getFocus={ref => this.input3 = ref}
                                onSubmitEditing={() => this.input4 && this.input4.focus()}
                            />
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Color *"
                                placeholderName={"e.g. Black"}
                                isError={this.isError('color')}
                                value={color}
                                onChangeText={value => this.onTextChange("color", value)}
                                getFocus={ref => this.input4 = ref}
                                onSubmitEditing={() => this.input5 && this.input5.focus()}
                            />
                            <MultiTextInputWithLabel
                                margin={[10, 0]}
                                label="Description *"
                                placeholderName={"e.g. About your product"}
                                isError={this.isError('description')}
                                value={description}
                                onChangeText={value => this.onTextChange("description", value)}
                                getFocus={ref => this.input5 = ref}
                                onSubmitEditing={() => this.input6 && this.input6.focus()}
                            />

                            <Section
                                label={"Price"} />
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Price *"
                                placeholderName={"e.g. Rs.100"}
                                isError={this.isError('price')}
                                value={price}
                                keyboardType={'numeric'}
                                onChangeText={value => this.onTextChange("price", value)}
                                getFocus={ref => this.input6 = ref}
                                onSubmitEditing={() => this.input7 && this.input7.focus()}
                            />
                            <TextInputWithLabel
                                margin={[10, 0]}
                                label="Discount *"
                                placeholderName={"e.g. 10%"}
                                isError={this.isError('discount')}
                                value={discount}
                                keyboardType={'numeric'}
                                onChangeText={value => this.onTextChange("discount", value)}
                                getFocus={ref => this.input7 = ref}
                                onSubmitEditing={() => this.input8 && this.input8.focus()}
                            />

                            <Section
                                label={"Highlights"} />
                            <MultiTextInputWithLabel
                                margin={[10, 0]}
                                label="Material *"
                                placeholderName={"e.g. materials"}
                                isError={this.isError('material')}
                                value={material}
                                onChangeText={value => this.onTextChange("material", value)}
                                getFocus={ref => this.input8 = ref}
                                onSubmitEditing={() => this.input9 && this.input9.focus()}
                            />
                            <MultiTextInputWithLabel
                                margin={[10, 0]}
                                label="Occasion *"
                                placeholderName={"e.g. occasion"}
                                isError={this.isError('occasion')}
                                value={occasion}
                                onChangeText={value => this.onTextChange("occasion", value)}
                                getFocus={ref => this.input9 = ref}
                                onSubmitEditing={() => this.input10 && this.input10.focus()}
                            />
                            <MultiTextInputWithLabel
                                margin={[10, 0]}
                                label="Type *"
                                placeholderName={"e.g. type"}
                                isError={this.isError('type')}
                                value={type}
                                onChangeText={value => this.onTextChange("type", value)}
                                getFocus={ref => this.input10 = ref}
                                onSubmitEditing={() => { }}
                            />

                            <Section
                                label={"Select Type"} />
                            <SelectProductTypeList
                                heading={"Select Type *"}
                                isError={this.isError('selectType')}
                                onSelect={value => this.onTextChange("selectType", value)}
                                value={selectType}
                                data={['SALE', 'BANDE', 'POPULAR']} />
                            <SelectProductTypeList
                                heading={"Select Category *"}
                                isError={this.isError('category')}
                                onSelect={value => this.onTextChange("category", value)}
                                value={category}
                                data={['Multi Brand\'s', 'Garments', 'Boutiques', 'Designers \n(men, woman)', 'Cloth \nHouse/Shop']} />
                            {
                                screenType === "edit" ?
                                    <SelectProductTypeList
                                        heading={"Product status *"}
                                        isError={this.isError('status')}
                                        onSelect={value => this.onTextChange("status", value === 'active' ? '1' : '0')}
                                        value={item.status && parseInt(item.status) === 1 ? 'active' : 'deactive'}
                                        data={['Active', 'Deactive']} />
                                    : null
                            }

                        </WView>
                        <Large
                            label="Next"
                            isLoading={isLoading}
                            onPress={this.sumbit.bind(this)}
                            style={{ marginTop: 10, marginBottom: 56 }}
                        />
                    </WView>
                </ScrollView>
                <CompleteIndicatorStatus />
            </WView >
        )
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
