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

    static async addItem(product) {
        try {
            
            if (!(await ShoppingCartManager.ableToAddToCart(product))) return;

            const result = await ShoppingCartManager.getBySku(product.sku);
    
            if (result.length) {
                const item = result[0];
                await db.items.where("sku").equals(product.sku).modify({count: item.count + 1});
            }
            else {
                console.log("adding item")
                await db.items.add({
                    name: slugify(product.name), 
                    price: product.price,
                    tax_percent: product.tax_percent,
                    count: 1,
                    sku: product.sku
                });
            }
            
            ShoppingCartManager.updateNotifications();

        } catch (e) {
            console.log(`error inserting item: {name: "${product.name}", price: ${product.price}}`);
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

    static async getBySku(sku) {
        return db.items.where("sku").equals(sku).toArray();
    }

    static async ableToAddToCart(product) {
        const cartProduct = await ShoppingCartManager.getBySku(product.sku);

        if (product.stock <= cartProduct.length) return false;
        return true;
    }

    static async all() {
        return await db.items.toArray();
    }

    static async skusArray() {
        const items = await ShoppingCartManager.all()
        const skus = items.map(item => item.sku);
        return skus;
    }

    static async itemCount() {
        return await db.items.count();
    }

    static async clearCart() {
        await db.items.clear();
        ShoppingCartManager.updateNotifications();
    }

    static async taxTotal() {
        let total = 0;
        const items = await ShoppingCartManager.all();

        items.forEach(item => total += parseFloat(item.count * item.price * (item.tax_percent / 100 )));

        return Math.round(100 * total) / 100;
    }

    static async totalPrice() {
        let total = 0;
        const items = await ShoppingCartManager.all();

        items.forEach(item => {
            total += parseFloat(item.price * item.count);
        });

        total += await ShoppingCartManager.taxTotal();

        return Math.round(100 * total) / 100;

    }
}