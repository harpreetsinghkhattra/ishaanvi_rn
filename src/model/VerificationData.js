export class VerificationData {
    static state = {
        "pin1": "",
        "pin2": "",
        "pin3": "",
        "pin4": "",
        "pin5": "",
        "pin6": "",
    }

    static setData(data) {
        Object.assign(this.state, data);
    }

    static getData() {
        return this.state;
    }
}