const postOfferData = {
    "itemCode": "",
    "name": "",
    "size": "",
    "color": "",
    "description": "",
    "price": "",
    "discount": "",
    "material": "",
    "occasion": "",
    "type": "",
    "selectType": "",
    "category": "",
    "status": "",
    "photos": []
};

export class PostOffer {
    static state = postOfferData;

    static setData(data) {
        Object.assign(this.state, data);
    }

    static getData() {
        return this.state;
    }

    static resetData() {
        this.state = postOfferData;
    }
}