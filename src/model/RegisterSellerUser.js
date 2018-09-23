export class RegisterSellerUser {
    static state = {
        "email": "",
        "mobile_number": "",
        "terms_and_conditions": "",
        "password": "",
        "confirm_password": "",
        "name": "",
        "business_name": "",
        "business_address": "",
        "category": "",
        "userType": 1,
        "validMobileNumber": 0
    }

    static setData(data) {
        Object.assign(this.state, data);
    }

    static getData() {
        return this.state;
    }
}