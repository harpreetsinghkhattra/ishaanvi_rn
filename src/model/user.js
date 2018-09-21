export class User {
    static state = {
        "_id": "",
        "email": "",
        "userType": "",
        "mobileNumber": "",
        "termsAndConditions": "",
        "status": 0,
        "deletedStatus": 0,
        "userAccessToken": "",
        "createdTime": "",
        "updatedTime": "",
        "forgetPassword": 0
    }

    static setUserData(data) {
        Object.assign(this.state, data);
    }

    static getUserData() {
        return this.state;
    }
}