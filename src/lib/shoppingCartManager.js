import { slugify } from "./utils";
import { db } from "./db";

export default class ShoppingCartManager {
    static isInitiated = false;
    static cartItems = ["NOT INITIATED"];
    static setCartItems = () => console.log("Not initiated");

    static initCartItems(cartItems, setCartItems) {
        if (ShoppingCartManager.isInitiated) return;

        ShoppingCartManager.cartItems = cartItems;
        
        ShoppingCartManager.setCartItems = (items) => {
            ShoppingCartManager.cartItems = items; 
            setCartItems(items);
        };

        ShoppingCartManager.isInitiated = true;
        
        console.log("Initiated shopping cart");
    }

    static async addItem(product, qty=1) {
        try {
            
            if (!(await ShoppingCartManager.ableToAddToCart(product))) return;

            const item = await ShoppingCartManager.getBySku(product.sku);
    
            if (item) {
                await db.items.where("sku").equals(product.sku).modify({count: item.count + 1});
            }

            else {
                console.log("adding item")
                await db.items.add({
                    name: slugify(product.name), 
                    price: product.price,
                    tax_percent: product.tax_percent,
                    count: parseInt(qty),
                    sku: product.sku
                });
            }
            

        } catch (e) {
            console.error(e);
            console.log(`error inserting item: {name: "${product.name}", price: ${product.price}}`);
            return false;
        }

        ShoppingCartManager.all().then(ShoppingCartManager.setCartItems);
    }

    static async deleteItem(sku) {
        let deleteCount = await db.items.where("sku").equals(sku).delete();
        ShoppingCartManager.all().then(ShoppingCartManager.setCartItems);
        return deleteCount;
    }

    static async getItem(name) {
        return await db.items.where("name").equals(name);
    }

    static async isItemInCart(sku) {
        const item = await ShoppingCartManager.getBySku(sku);
        return item ? true : false;
    }

    static async getBySku(sku) {
        const result = await db.items.where("sku").equals(sku).toArray();
        if (result.length) return result[0];

        return null;
    }

    static async updateItemQty(sku, qty) {
        await db.items.where("sku").equals(sku).modify({count: qty});
        ShoppingCartManager.all().then(ShoppingCartManager.setCartItems);
    }

    static async ableToAddToCart(product) {
        const item = await ShoppingCartManager.getBySku(product.sku);
        if (item && product.stock <= item.count) return false;
        return true;
    }

    static async all() {
        return await db.items.toArray();
    }

    static async itemsJSON() {
        const items = await ShoppingCartManager.all();
        return JSON.stringify({items: items});
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
        ShoppingCartManager.all().then(ShoppingCartManager.setCartItems);
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