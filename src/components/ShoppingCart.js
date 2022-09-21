import { useEffect } from "react";
import { useState } from "react";
import ShoppingCartManager from "../shoppingCartManager";
import { preventDefaults } from "../utils";

export function Notification({ count }) {
    return <span id="cart_notification" className="absolute z-10 right-[-10px] top-[-8px] text-white text-sm bg-green-600 rounded-full aspect-square w-5 grid place-items-center">{ count }</span>
}


export function ViewCart(props) {
    const items = ShoppingCartManager.all();
    const [cartIcon, setCartIcon] = useState(null);
    const [cartRect, setCartRect] = useState(null);
    const [listenerAdded, setListenerAdded] = useState(false);

    useEffect(() => {
        if (!cartIcon) {
            setCartIcon(document.querySelector("#cart_icon"));
            return;
        }

        if (!cartRect) {
            setCartRect(cartIcon.getBoundingClientRect());
            return;
        }

        if (!listenerAdded) {
            window.addEventListener("resize", () => {
                setCartIcon(document.querySelector("#cart_icon"));
                
                if (!cartIcon) return;
        
                setCartRect(cartIcon.getBoundingClientRect());
            });

            setListenerAdded(true);
        }
        
       
    })

    if (!cartIcon || !cartRect) return;

    const cartItems = [];
    for (let itemName in items) {
        cartItems.push(<div key={ itemName }>{ itemName }: { items[itemName] }</div>)
    }

    const style = {
        position: "fixed",
        top: `${cartRect.y + 30}px`,
        left: `${cartRect.x + 30}px`,
        marginRight: "1rem"
    }

    return (
        <div style={ style } className="bg-white rounded p-2 z-20 shadow-lg" { ...props }>
            { cartItems }
        </div>
    );
}

export function ShoppingCart(props) {
    const [notification, setNotification] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [listenerAdded, setListenerAdded] = useState(false);

    useEffect(() => {
        if (ShoppingCartManager.itemCount()) {
            setNotification(<Notification count={ ShoppingCartManager.itemCount() } />);
        }
        
        if (!listenerAdded) {
            window.addEventListener("click", () => {
                setIsViewing(false);
            });

            setListenerAdded(true);
        }

    }, [setNotification]);

    function handleClick(e) {
        preventDefaults(e);

        if (!isViewing) setIsViewing(true);
        else setIsViewing(false);

    }

    return (
        <div id="cart_icon" className="relative" onClick={ handleClick }>
            { notification }
            { isViewing ? <ViewCart onClick={ preventDefaults }/>: "" }
            <img src={ `${ process.env.PUBLIC_URL }/icons/cart.svg` } className={ `w-7 interactive-hover cursor-pointer ${props.className}` }/>
        </div>
    );
}