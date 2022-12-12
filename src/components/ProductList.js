import { useState, useEffect } from "react";
import ShoppingCartManager from "../lib/shoppingCartManager";
import { Item } from "./ShoppingCart";

export default function ProductList(props) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function wrapper() {
            let items = await ShoppingCartManager.all();
            let itemComponents = [];

            for (let item of items) {
                itemComponents.push(<Item key={ item.name } item={ item } />);
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