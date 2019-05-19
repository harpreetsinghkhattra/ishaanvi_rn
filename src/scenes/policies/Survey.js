import React, { Component } from 'react'
import { WView, WText, WRow, Header, WTextInput } from '../../components/common';
import { ScrollView, PixelRatio, Alert, Image } from 'react-native';
import Palette from '../../Palette';
import { Large } from '../../components/UI/btn';
import { routerNames } from '../../RouteConfig';
import { getSurvey, saveSurvey } from '../../api/SocketUrls';
import { Api, Socket, User as UserApi } from '../../api';
import { User } from '../../model/user';
import { SelectProductTypeList } from '../../components/Lists';
import { MultiTextInputWithLabel } from '../../components/UI/input';

export default class Survey extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            isSubmitLoading: false
        }

        this.surveyId = null;
        this.requestData = [];
    }

    componentDidMount = () => {
        this.getSurvey();
    }

    getSurvey() {
        const { _id: id, userAccessToken: accessToken, filterData, location } = User.getUserData();

        this.setState({ isLoading: true });
        Socket.request(getSurvey.emit, {
            id,
            accessToken
        });
        UserApi.getSocketResponseOnce(getSurvey.on, (res) => {
            this.setState({ isLoading: false });
            if (res && res.message === "Success") {
                this.setState({ data: res.data.questions });
                this.surveyId = res.data._id;
                this.requestData = res.data.questions && res.data.questions.length ? res.data.questions.map((ele, index) => {
                    return ({
                        index,
                        question: ele.question,
                        answerId: null,
                        type: ele.type
                    });
                }) : []
            }
        });
    }

    onChangeText = (index, answerId) => {
        if (index > -1) {
            this.requestData[index].answerId = answerId;
        }
    }

    sumbit = () => {
        const { _id: id, userAccessToken: accessToken } = User.getUserData();

        if (!this.surveyId) return;

        this.setState({ isSubmitLoading: true });
        Socket.request(saveSurvey.emit, {
            id,
            accessToken,
            answers: this.requestData,
            surveyId: this.surveyId
        });
        UserApi.getSocketResponseOnce(saveSurvey.on, (res) => {
            this.setState({ isSubmitLoading: false });
            if (res && res.message === "Success") {
                Alert.alert("Success!", "Successfully submitted, Thanks for your support.");
            }else Alert.alert("Oops!", "Something went wrong, please try again.");
        });
    }

    render() {
        const { screenWidth, screenHeightWithHeader, history } = this.props;
        const { stretch } = styles;
        const { data, isLoading, isSubmitLoading } = this.state;

        return (
            <WView dial={2} flex style={{ alignItems: 'stretch' }}>
                <Header
                    onPress={() => history.goBack()}
                    label={"Survey"}
                />
                <ScrollView contentContainerStyle={[{ minWidth: screenWidth, minHeight: screenHeightWithHeader, justifyContent: 'flex-start' }, stretch]}>
                    <WView flex dial={5} padding={[10, 10]} style={[stretch]} >
                        {
                            isLoading ?
                                <WSpinner size="small" color={Palette.theme_color} />
                                :
                                <WView flex dial={2} style={[stretch]}>
                                    <WText fontSize={14} lines={3}>{`Thank you for taking this brief survey! Your answers will help us make shopping on ISHAANVI unique, delightful and easy.`}</WText>
                                    <WText fontSize={14} padding={[10, 0]} lines={3}>{`Your privacy is important to us.`}</WText>
                                    <WText fontSize={14} padding={[10, 0]} lines={3}>{`If you need assistance, pieces call us at +911111111111 or email us at example@ishaanvi.co`}</WText>
                                    {
                                        data && data.length ? data.map((ele, index) => {

                                            if (ele && ele.type === "input") {
                                                return (
                                                    <MultiTextInputWithLabel
                                                        key={`survey-question-${index}`}
                                                        margin={[10, 0]}
                                                        label={ele.question}
                                                        placeholderName={"Write here"}
                                                        onChangeText={value => this.onChangeText(index, value)}
                                                        onSubmitEditing={() => { }}
                                                    />
                                                );
                                            };

                                            return (
                                                <SelectProductTypeList
                                                    key={`survey-question-${index}`}
                                                    heading={ele.question}
                                                    right={false}
                                                    onSelect={value => {
                                                        let i = ele.options.findIndex(ele => ele.value.replace(/\n/gi, ' ').toLowerCase() === value);
                                                        this.onChangeText(index, i > -1 ? ele.options[i].id : null);
                                                    }}
                                                    data={ele.options.map(ele => ele.value.replace(/\n/gi, ' '))} />
                                            );
                                        }) : null
                                    }
                                    <Large
                                        label="Submit"
                                        isLoading={isSubmitLoading}
                                        onPress={this.sumbit.bind(this, 1)}
                                        style={{ marginTop: 10, marginBottom: 10 }}
                                    />
                                </WView>
                        }
                    </WView>
                </ScrollView>
            </WView >
        )
    }
}

const styles = {
    stretch: {
        alignItems: 'stretch'
    }
}
