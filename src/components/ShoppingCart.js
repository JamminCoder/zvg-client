import { useEffect } from "react";
import { useState } from "react";
import ShoppingCartManager from "../shoppingCartManager";
import { preventDefaults } from "../utils";

export function Item({ item }) {
    return (
        <div key={ item.name } className="border-b border-b-gray-300 mb-2">
            <h4>{ item.name } - { item.count }</h4>
            <h6>${ item.price * item.count}</h6>
        </div>
    );
}

export function ViewCart(props) {
    const [cartItems, setCartItems] = useState([]);
    const [cartIcon, setCartIcon] = useState(null);
    const [cartRect, setCartRect] = useState(null);
    const [listenerAdded, setListenerAdded] = useState(false);

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
                itemComponents.push(<Item item={ parsedItems[itemName] } />)
            }

            setCartItems(itemComponents);
        }

        wrapper();

        
        if (!cartIcon) {
            setCartIcon(document.querySelector("#cart-icon"));
            return;
        }

        if (!cartRect) {
            setCartRect(cartIcon.getBoundingClientRect());
            return;
        }

        if (!listenerAdded) {
            window.addEventListener("resize", () => {
                setCartIcon(document.querySelector("#cart-icon"));
                
                if (!cartIcon) return;
        
                setCartRect(cartIcon.getBoundingClientRect());
            });

            setListenerAdded(true);
        }

    });

    function clearCart() {
        ShoppingCartManager.clearCart();
        ShoppingCartManager.updateCartNotification();
    }

    if (!cartRect || !cartItems) return;

    const viewStyle = {
        position: "fixed",
        top: `${cartRect.y + 30}px`,
        left: `${cartRect.x + 30}px`,
        marginRight: "1rem"
    }

    return (
        <div style={ viewStyle } className="bg-white rounded p-2 z-20 shadow-lg min-w-[10rem]" { ...props }>
            { !cartItems.length > 0 ? "Nothing in cart": cartItems }
            { cartItems.length > 0 ? <button className="py-1 px-2 bg-red-500 text-white font-bold" onClick={ clearCart }>Clear Cart</button>: "" }
        </div>
    );
}

export function ShoppingCart(props) {
    const [isViewing, setIsViewing] = useState(false);
    const [listenerAdded, setListenerAdded] = useState(false);

    
    useEffect(() => {
        async function wrapper() {
            if (!listenerAdded) {
                window.addEventListener("click", () => {
                    setIsViewing(false);
                });
    
                setListenerAdded(true);
            }
        }

        ShoppingCartManager.updateCartNotification();
        
        wrapper();

    });

    function handleClick(e) {
        preventDefaults(e);

        if (!isViewing) setIsViewing(true);
        else setIsViewing(false);

    }

    return (
        <div id="cart-icon" className="relative" onClick={ handleClick }>
            { isViewing ? <ViewCart onClick={ preventDefaults }/>: "" }
            <img src={ `${ process.env.PUBLIC_URL }/icons/cart.svg` } className={ `w-7 interactive-hover cursor-pointer ${props.className}` }/>
        </div>
    );
}