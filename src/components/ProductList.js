import { useState, useEffect } from "react";
import ShoppingCartManager from "../lib/shoppingCartManager";
import Button from "./Button";

export default function ProductList(props) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function wrapper() {
            let items = await ShoppingCartManager.all();

            let itemNames = [];
            let parsedItems = {};
            let itemComponents = [];

            for (let itemIndex in items) {
                const item = items[itemIndex];
                
                if (!itemNames.includes(item.name)) {
                    itemNames.push(item.name);
                    parsedItems[item.name] = item;

                } else {
                    try {
                        parsedItems[item.name].count += 1;
                    } catch (e) {
                        parsedItems[item.name] = item;
                        parsedItems[item.name].count += 1;

                    }
                }
            }

            for (let itemName in parsedItems) {
                itemComponents.push(
                <div key={ itemName }>
                    <div className="border-b my-2 py-2">
                        <p>{ itemName } - ${ parsedItems[itemName].price * parsedItems[itemName].count }</p>
                        <p>QTY: { parsedItems[itemName].count }</p>
                    </div>
                </div>
                )
            }

            setCartItems(itemComponents);
        }

        wrapper();
    });

    if (!cartItems) return;

    return (
        <div className={`bg-white rounded p-2 z-20 shadow-lg min-w-[15rem] text-xl ${ props.className }`}>
            { !cartItems.length > 0 ? "Nothing in cart": cartItems } 
        </div>
    );
}