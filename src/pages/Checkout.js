import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import ShoppingCartManager from "../lib/shoppingCartManager";
import PaypalCheckout from "../components/PaypalCheckout";




export default function Checkout(props) {
    const [price, setPrice] = useState(0);
    const [items, setItems] = useState(null);

    useEffect(() => {
        if (!price)
            ShoppingCartManager.totalPrice().then(price => setPrice(price));
        
        if (!items)
            ShoppingCartManager.all().then(items => setItems(items));
    });

    return (
        <div className="px-4 py-24 mx-auto flex justify-center gap-12">
            <div className="bg-white rounded p-2 z-20 shadow-lg max-w-[50rem] flex-grow text-xl">
                <PaypalCheckout/>
                <ProductList className="mb-5"/>
                <div className="text-xl">
                    Total: ${ price }
                </div>
            </div>   
        </div>
    );
}