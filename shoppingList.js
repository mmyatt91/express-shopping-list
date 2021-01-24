const items = require("./fakeDb.js")

class shoppingList {
    constructor(name, price) {
        this.name = name,
        this.price = price
        items.push(this)
    }

    static findAll(){
        return items 
    }

    static findItem(name){
        const foundItem = items.find(i => i.name === name);
        if(foundItem === undefined) {
            throw { message: "Item not found.", status: 400 } 
        } 
        return foundItem
    }

    static updateItem(name, data){
        const foundItem = shoppingList.findItem(name);
        if(foundItem === undefined) {
            throw { message: "Item not found.", status: 400}
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem
    }

    static removeItem(name){
        const itemIdx = items.findIndex( v => v.name === name);
        if(itemIdx === -1){ 
            throw { message: "Item not found.", status: 404}
        }
        items.splice(itemIdx, 1)
    }
}

module.exports = shoppingList