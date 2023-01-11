import ProductList from "../../components/ProductList";
import { useEffect, useState } from "react";
import ShoppingCartManager from "../../lib/shoppingCartManager";
import SquareCheckout from "./SquareCheckout";




export default function Checkout(props) {
    const [price, setPrice] = useState(0);
    const cartItems = props.cartItems;
    const [tax, setTax] = useState(0);

    useEffect(() => {
        if (!price)
            ShoppingCartManager.totalPrice().then(price => setPrice(price));

        if (!tax)
            ShoppingCartManager.taxTotal().then(tax => setTax(tax));
    });

    return (
        <div className="px-4 py-24 mx-auto flex justify-center gap-12">
            <div className="bg-white rounded p-2 z-20 shadow-lg max-w-[50rem] flex-grow text-xl">
                
                <ProductList className="mb-5" cartItems={ cartItems }/>

                Tax: ${ tax }
                <div className="text-xl mb-8">
                    Total: ${ price }
                </div>
                <SquareCheckout/>
            </div>   
        </div>
    );
}