import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import ShoppingCartManager from "../lib/shoppingCartManager";

export default function Checkout(props) {
    const [price, setPrice] = useState(0);
    useEffect(() => {
        ShoppingCartManager.totalPrice().then(price => setPrice(price));
    });

    return (
        <div className="mx-auto px-4 py-24">
            <main className="grid place-content-center md:grid-cols-2 max-w-[100rem] flex-grow gap-12">
                <div className="bg-gray-300">
                    payment infos
                </div>

                <div className="flex flex-col justify-center gap-5">
                    {/* <ViewCart className="w-52"/> */}
                    <ProductList/>
                    <div className="text-xl">
                        Total: ${ price }
                    </div>
                    
                </div>
            </main>   
                         
        </div>
    );
}