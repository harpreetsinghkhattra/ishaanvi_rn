const registerSellerUserData = {
    "email": "",
    "mobile_number": "",
    "terms_and_conditions": "",
    "password": "",
    "confirm_password": "",
    "name": "",
    "business_name": "",
    "business_address": "",
    "category": "",
    "location": {lat: null, lng: null},
    "address": "",
    "userType": 1,
    "validMobileNumber": 0
};

export class RegisterSellerUser {
    static state = registerSellerUserData;

    static setData(data) {
        Object.assign(this.state, data);
    }

    static getData() {
        return this.state;
    }

    static resetData() {
        this.state = registerSellerUserData;
    }
}