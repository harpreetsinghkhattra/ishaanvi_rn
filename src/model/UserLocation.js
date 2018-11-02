export class UserLocation {
    static state = {
        "latitude": '',
        "longitude": '',
        "address": '',
        "zipCode": ''
    }

    static setUserLocationData(data) {
        Object.assign(this.state, data);
    }

    static getUserLocationData() {
        return this.state;
    }

    static resetUserData() {
        this.state = {
            "latitude": '',
            "longitude": '',
            "address": '',
            "zipCode": ''
        }
    }
}