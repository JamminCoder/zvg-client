import { useState, useEffect } from "react";
import { Item } from "./ShoppingCart";

export default function ProductList(props) {
    const [itemComponents, setItemComponents] = useState([]);
    
    useEffect(() => {
        if (itemComponents.length) return;

        for (let item of props.cartItems) {
            itemComponents.push(<Item key={ item.name } item={ item } />);
        }

        setItemComponents([...itemComponents]);
    });

    if (!props.cartItems) return;

    return (
        <div className={ props.className }>
            { !props.cartItems.length > 0 ? "Nothing in cart": itemComponents } 
        </div>
    );
}