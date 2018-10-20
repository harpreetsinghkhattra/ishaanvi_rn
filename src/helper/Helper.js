export class Helper {

    constructor() {

    }

    /**
     * Check for, is object empty?
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static isObjectEmpty(obj, cb) {
        let names = Object.getOwnPropertyNames(obj);
        console.log("names =>", names);
        return Promise.resolve({ status: (names.length === 0) ? true : false, names });
    }

    /**
     * Check for, is data array format?
     * @param {*object} obj 
     * @param {*function} cb 
     */
    static isDataArray(obj) {
        cb(obj.length !== undefined ? true : false);
    }

    /**
     * For sorting
     * @param {*any} a 
     * @param {*any} b 
     */
    static compare(a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    /**
     * Validate email address
     * @param {*string} email 
     */
    static validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
     * Validate mobile
     * @param {*string} number
     */
    static validateMobile(number) {
        // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (number && number.length >= 10 && number.length <= 12);
    }

    /** Validate password */
    static validatePassword = (value) => {
        return (value && value.length >= 5) ? true : false;
    }

    /**
     * Merge objects
     * @param {*object} obj 
     * @param {*function} oldObj 
     */
    static mergeObject(obj, oldObj) {
        return Object.assign(obj, oldObj)
    }

    /**
     * Validate the request 
     * @param {*object} obj 
     */
    static validate(parameters, obj) {
        return this.isObjectEmpty(obj)
            .then(({ status, names }) => {
                console.log("names", status, names);
                if (!status) {
                    var existedFields = {
                        keys: names,
                        emptyKeys: []
                    }
                    parameters.forEach((element, index) => {
                        !obj[element] && existedFields.emptyKeys.push({ fieldName: element, message: "Required" });
                    });

                    //Specific fields validations
                    existedFields.emptyKeys.length <= 0 &&
                        existedFields.keys.forEach((element) => {
                            switch (element) {
                                case "email":
                                    !this.validateEmail(obj["email"]) && existedFields.emptyKeys.push({ fieldName: element, message: "Email address is not valid." });
                                    break;
                                case "mobile_number":
                                    !this.validateMobile(obj["mobile_number"]) && existedFields.emptyKeys.push({ fieldName: element, message: "Mobile number is not valid." });
                                    break;
                                case "password":
                                    !this.validatePassword(obj["password"]) && existedFields.emptyKeys.push({ fieldName: element, message: "Password at least 5 characters" });
                                    break;
                                case "confirm_password":
                                    if (obj["password"] !== obj["confirm_password"]) {
                                        existedFields.emptyKeys.push({ fieldName: "password", message: "Password is not matched." });
                                        existedFields.emptyKeys.push({ fieldName: "confirm_password", message: "Password is not matched." });
                                    }
                                    break;
                            }
                        });

                    return Promise.resolve({ status: existedFields.emptyKeys.length > 0 ? false : true, response: existedFields.emptyKeys });
                } else return Promise.resolve({ status: false, response: parameters });
            });
    }

    /** Reset and push rout in stack */
    static resetAndPushRoot(history, path) {
        history.entries = [];
        history.index = -1;
        history.push(path);
    }
}