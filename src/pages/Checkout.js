import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import ShoppingCartManager from "../lib/shoppingCartManager";
import PaypalCheckout from "../components/PaypalCheckout";




export default function Checkout(props) {
    const [price, setPrice] = useState(0);
    useEffect(() => {
        if (!price) ShoppingCartManager.totalPrice().then(price => setPrice(price));
    });

    return (
        <div className="px-4 py-24">
            <main className="mx-auto grid place-content-center md:grid-cols-2 max-w-[100rem] flex-grow gap-12">
                <div>
                    <PaypalCheckout/>
                </div>

                <div className="bg-white rounded p-2 z-20 shadow-lg min-w-[15rem] text-xl">
                    <ProductList className="mb-5"/>
                    <div className="text-xl">
                        Total: ${ price }
                    </div>
                </div>
            </main>   
                         
        </div>
    );
}