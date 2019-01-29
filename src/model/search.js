export class Search {
    static state = {
        "search": ''
    }

    static setSearchData(data) {
        Object.assign(this.state, data);
    }

    static getSearchData() {
        return this.state;
    }

    static resetSearchData() {
        this.state = {
            "search": ''
        }
    }
}