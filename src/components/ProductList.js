import { useState, useEffect } from "react";
import ShoppingCartManager from "../lib/shoppingCartManager";
import Button from "./Button";
import { capatalizeFirstLetter } from "../lib/utils";

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
                const item = parsedItems[itemName];
                itemComponents.push(
                <div key={ itemName }>
                    <div 
                        key={ item.name } 
                        className="border-b border-b-gray-300 mb-1 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        <h4 className="text-lg">
                            <span className="font-bold ">{ capatalizeFirstLetter(item.name) } </span>
                            - ${ item.price * item.count}</h4>
                        <h5>
                            <span className="font-medium">Qty</span>: { item.count } 
                        </h5>
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
        <div className={ props.className }>
            { !cartItems.length > 0 ? "Nothing in cart": cartItems } 
        </div>
    );
}