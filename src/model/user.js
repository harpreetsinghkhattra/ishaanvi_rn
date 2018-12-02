export class User {
    static state = {
        "_id": "",
        "email": "",
        "name": "",
        "userType": "",
        "mobileNumber": "",
        "termsAndConditions": "",
        "status": 0,
        "deletedStatus": 0,
        "userAccessToken": "",
        "createdTime": "",
        "updatedTime": "",
        "forgetPassword": 0,
        "filterData": {
            "area": [0, 500],
            "category": [],
            "price": [0, 0]
        },
        "location": {
            "latitude": '',
            "longitude": '',
            "address": '',
            "zipCode": ''
        }
    }

    static setUserData(data) {
        Object.assign(this.state, data);
    }

    static getUserData() {
        return this.state;
    }

    static resetUserData() {
        this.state = {
            "_id": "",
            "email": "",
            "name": "",
            "userType": "",
            "mobileNumber": "",
            "termsAndConditions": "",
            "status": 0,
            "deletedStatus": 0,
            "userAccessToken": "",
            "createdTime": "",
            "updatedTime": "",
            "forgetPassword": 0,
            "filterData": {
                "area": [0, 500],
                "category": [],
                "price": [0, 0]
            },
            "location": {
                "latitude": '',
                "longitude": '',
                "address": '',
                "zipCode": ''
            }
        }
    }
}