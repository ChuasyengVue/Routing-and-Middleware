const items = require('./fakeDb')

class Item {
    constructor(name,price){
        this.name = name;
        this.price = price;

        items.push(this);
    }

    static getAll() {
        return items;
    }

    
    static findItem(name){
        let foundItem = items.find(i => i.name === name);
        if(!foundItem){
            throw { message: "Item Not Found!", status: 404}
        }
        return foundItem;
    }


    static updateItem(name,price){
        let foundItem = Item.find(name);
        if(!foundItem){
            throw {
                message: "Item Not Found!",
                status: 404
            }
        }

        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
    }


    static deleteItem(name){
        let foundItem = items.find(i => i.name === name);
        if(!foundItem){
            throw {
                message: "Item Not Found!",
                status: 404
            }
        }
        items.splice(foundItem,1);
    }
}

module.exports = Item;