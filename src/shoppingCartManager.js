import { slugify } from "./utils";
import { db } from "./db";

export default class ShoppingCartManager {
    static async updateCartNotification() {
        const itemCount = await ShoppingCartManager.itemCount();
        
        let notification = document.querySelector("#cart-notification");
        const cartIcon = document.querySelector("#cart-icon");

        if (!notification) {
            notification = document.createElement("span");
            notification.setAttribute("id", "cart-notification");

            if (itemCount === 0) {
                notification.remove();
                return;
            }

            notification.innerHTML = itemCount;
            cartIcon.appendChild(notification);
        }

        if (itemCount === 0)  {            
            notification.remove();
            return;
        };

        notification.innerHTML = itemCount;
    }

    static async addItem(name, price, count) {
        try {
            await db.items.add({
                name: slugify(name), 
                price: price,
                count: count
            });

            ShoppingCartManager.updateCartNotification();

        } catch (e) {
            console.log(`error inserting item: {name: "${name}", price: "${price}", count: ${count}}`);
        }   
    }

    static async getItem(name) {
        return await db.items.where("name").equals(name);
    }

    static async all() {
        return await db.items.toArray();
    }

    static async itemCount() {
        return await db.items.count();
    }

    static async clearCart() {
        await db.items.clear();
    }
}