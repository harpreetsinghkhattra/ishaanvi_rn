export class PostOffer {
    static state = {
        "itemCode": "1001",
        "name": "test product",
        "size": "20",
        "color": "red",
        "description": "Dummy text just to represent the dummy data of product, testing purpose repeating multiple times to show content",
        "price": "100",
        "discount": "10",
        "material": "material of product",
        "occasion": "test",
        "type": "test",
        "selectType": "",
        "category": "",
        "photos": []
    }

    static setData(data) {
        Object.assign(this.state, data);
    }

    static getData() {
        return this.state;
    }
}