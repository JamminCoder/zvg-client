import Dexie from "dexie";

export const db = new Dexie("cart");

db.version(1).stores({
    items: "++id, name, price, count",
});