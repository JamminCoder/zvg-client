import Dexie from "dexie";

export const db = new Dexie("cart");

db.version(2).stores({
    items: "++id, name, price, tax_percent, count, sku",
});