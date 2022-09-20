import { slugify } from "./utils";

export default class ShoppingCartManager {
    static addItem(itemName, qty) {
        
        itemName = slugify(itemName)
        let cartJSON = ShoppingCartManager.all();
        
        if (!cartJSON) {
            localStorage.setItem("shoppingCart", "{}");
            cartJSON = ShoppingCartManager.all();
        }

        if (cartJSON[itemName] != null) 
            cartJSON[itemName] = cartJSON[itemName] + qty;

        else cartJSON[itemName] = qty;

        localStorage.setItem("shoppingCart", JSON.stringify(cartJSON));
    }

    static getItem(itemName) {
        let cartJSON = ShoppingCartManager.all();
        if (!cartJSON) {
            localStorage.setItem("shoppingCart", "{}");
            cartJSON = ShoppingCartManager.all();
        }

        let result = cartJSON[itemName];
        return result;
    }

    static all() {
        return JSON.parse(localStorage.getItem("shoppingCart"));
    }

    static itemCount() {
        let cart = ShoppingCartManager.all();
        let count = 0;
        for (let itemName in cart) {
            count += cart[itemName] || 0;
        }

        return count;
    }
}