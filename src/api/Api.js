import { request } from '../Request';
import { Helper } from '../helper/Helper';
import Config from '../Config';

export class Api {

    static isValidForm = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                console.log(response);
                if (status) {
                    return Promise.resolve({ message: "Success" });
                } else return Promise.resolve({ status, response });
            })
    }

    static verification = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    const { email, ...rest } = body;

                    var token = "";
                    for (value in { ...rest }) {
                        token += body[value] ? body[value] : "";
                    }

                    return request(`${Config.http.baseUrl}verification`, { body: JSON.stringify({ email, token }) })
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }

    static resendVerificationToken = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    return request(`${Config.http.baseUrl}resendOTP`, { body: JSON.stringify(body) })
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }

    static sellerSignup = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    const { confirm_password, ...rest } = body;
                    return request(`${Config.http.baseUrl}sellerSignup`, { body: JSON.stringify(body) })
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }

    static register = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    const { confirm_password, ...rest } = body;
                    return request(`${Config.http.baseUrl}userSignup`, { body: JSON.stringify(body) })
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }

    static isValidMobileNumber = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    const { mobile_number } = body;
                    return request(`${Config.http.baseUrl}isValidNumber?mobile_number=91${mobile_number}`, { method: "GET" })
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }

    static login = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    return request(`${Config.http.baseUrl}login`, { body: JSON.stringify(body) })
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }

    static loginViaSocialMedia = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    return request(`${Config.http.baseUrl}loginViaFBAndGmail`, { body: JSON.stringify(body) })
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }

    static forgetPassword = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    return request(`${Config.http.baseUrl}forgetPassword`, { body: JSON.stringify(body) })
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }

    static resetPassword = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    return request(`${Config.http.baseUrl}resetPassword`, { body: JSON.stringify(body) })
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }

    static autoCompleteLocation = (keys, body) => {
        return Helper.validate(keys, body)
            .then(({ status, response }) => {
                if (status) {
                    return request(
                        `${Config.http.locationBaseUrl}?input=${body.location}&types=establishment&radius=500&key=${Config.keys.googleLocation}`, { "method": "GET" }
                    )
                        .then((res) => {
                            console.log("res get => ", res);
                            return Promise.resolve(res);
                        })
                        .catch(err => {
                            console.log("err", err);
                            return Promise.reject(err);
                        })
                } else return Promise.resolve({ status, response });
            })
    }
}
