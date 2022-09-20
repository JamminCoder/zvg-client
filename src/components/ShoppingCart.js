import { useEffect } from "react";
import { useState } from "react";
import ShoppingCartManager from "../shoppingCartManager";

export function Notification({ count }) {
    return <span id="cart_notification" className="absolute z-10 right-[-10px] top-[-8px] text-white text-sm bg-green-600 rounded-full aspect-square w-5 grid place-items-center">{ count }</span>
}

export function ShoppingCart(props) {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (ShoppingCartManager.itemCount()) {
            setNotification(<Notification count={ ShoppingCartManager.itemCount() } />);
        }
        
    }, [setNotification, ShoppingCartManager.itemCount]);

    return (
        <div id="cart_icon" className="relative">
            { notification }
            <img src={ `${ process.env.PUBLIC_URL }/icons/cart.svg` } className={`w-7 interactive-hover cursor-pointer ${props.className}`}/>
        </div>
    );
}