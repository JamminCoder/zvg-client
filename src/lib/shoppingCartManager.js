import { slugify } from "./utils";
import { db } from "./db";

export default class ShoppingCartManager {
    static async updateNotifications() {
        const notifications = document.querySelectorAll(".cart-notification");
        const itemCount = await ShoppingCartManager.itemCount();

        notifications.forEach(
            noti => noti.innerHTML = itemCount == 0 ? "": itemCount
        );
    }

    static async addItem(name, price, count) {
        try {
            await db.items.add({
                name: slugify(name), 
                price: price,
                count: count
            });

            ShoppingCartManager.updateNotifications();

        } catch (e) {
            console.log(`error inserting item: {name: "${name}", price: "${price}", count: ${count}}`);
        }   
    }

    static async deleteItem(name) {
        let deleteCount = await db.items.where("name").equals(name).delete();
        ShoppingCartManager.updateNotifications();
        // console.log(`Deleted ${deleteCount} items from ${name}.`)
    }

    static async getItem(name) {
        return await db.items.where("name").equals(name);
    }

    static async all() {
        return await db.items.toArray();
    }

    static async namesArray() {
        const items = await ShoppingCartManager.all()
        const names = items.map(item => item.name);
        return names;
    }

    static async itemCount() {
        return await db.items.count();
    }

    static async clearCart() {
        await db.items.clear();
        ShoppingCartManager.updateNotifications();
    }

    static async totalPrice() {
        let total = 0;
        const items = await ShoppingCartManager.all();

        items.forEach(item => total += parseFloat(item.price));

        return Math.round(100 * total) / 100;

    }
}