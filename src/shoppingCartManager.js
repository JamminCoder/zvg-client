import { slugify } from "./utils";

export default class ShoppingCartManager {
    static addItem(itemName, qty) {
        
        itemName = slugify(itemName)
        let cartJSON = ShoppingCartManager.all();
        
        if (!cartJSON) {
            localStorage.setItem("shoppingCart", "{}");
            cartJSON = ShoppingCartManager.all();
        }

        if (cartJSON[itemName] != null) {
            cartJSON[itemName] = cartJSON[itemName] + qty;
        } else { cartJSON[itemName] = qty; }

        localStorage.setItem("shoppingCart", JSON.stringify(cartJSON));

        let notification = document.querySelector("#cart_notification")
        try {
            notification.innerHTML = parseInt(notification.innerText) + qty;
        } catch (e) {
            let notification = document.createElement("span")
            notification.classList.add("absolute", "z-10", "right-[-10px]", "top-[-8px]", "text-white", "text-sm", "bg-green-600", "rounded-full", "aspect-square", "w-5", "grid", "place-items-center")
            notification.setAttribute("id", "cart_notification");
            notification.innerText = 1;
            document.querySelector("#cart_icon").appendChild(notification)
        }
        
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