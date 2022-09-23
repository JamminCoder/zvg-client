import { useEffect } from "react";
import { useState } from "react";
import ShoppingCartManager from "../shoppingCartManager";
import { preventDefaults } from "../utils";

export function Notification({ count }) {
    return <span id="cart_notification" className="absolute z-10 right-[-10px] top-[-8px] text-white text-sm bg-green-600 rounded-full aspect-square w-5 grid place-items-center">{ count }</span>
}

export function Item({ item }) {
    console.log(item);
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
            if (cartItems.length == 0) {
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
        }
        wrapper();

        
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

    });

    if (!cartRect || !cartItems) return;

    const style = {
        position: "fixed",
        top: `${cartRect.y + 30}px`,
        left: `${cartRect.x + 30}px`,
        marginRight: "1rem"
    }

    return (
        <div style={ style } className="bg-white rounded p-2 z-20 shadow-lg min-w-[10rem]" { ...props }>
            { cartItems }
            { cartItems.length > 0 ? <button className="py-1 px-2 bg-red-500 text-white font-bold" onClick={ ShoppingCartManager.clearCart }>Clear Cart</button>: "" }
        </div>
    );
}

export function ShoppingCart(props) {
    const [notification, setNotification] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [listenerAdded, setListenerAdded] = useState(false);

    
    useEffect(() => {
        async function wrapper() {
            const itemCount = await ShoppingCartManager.itemCount()
            if (itemCount) {
                setNotification(<Notification count={ itemCount } />);
            }
            
            if (!listenerAdded) {
                window.addEventListener("click", () => {
                    setIsViewing(false);
                });
    
                setListenerAdded(true);
            }
        }
        
        wrapper();

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