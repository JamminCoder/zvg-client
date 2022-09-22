import { slugify } from "./utils";
import { db } from "./db";

export default class ShoppingCartManager {
    static async addItem(name, price, count) {

        try {
            const id = await db.items.add({
                name: slugify(name), 
                price: price,
                count: count
            });

            console.log(id);

        } catch (e) {
            console.log("error inserting data");
        }   
    }

    static async getItem(name) {
        return await db.items.where("name").equals(name)
    }

    static async all() {
        return await db.items.toArray();
    }

    static async itemCount() {
        return await db.items.count();
    }
}