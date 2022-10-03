import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartManager from "../shoppingCartManager";
import { capatalizeFirstLetter, preventDefaults } from "../utils";

export function Item({ item }) {

    function remove(e) {
        preventDefaults(e);
        ShoppingCartManager.deleteItem(item.name);
    }

    return (
        <div 
            key={ item.name } 
            className="border-b border-b-gray-300 mb-1 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
        >
            <h4 className="text-lg">
                <span className="font-bold ">{ capatalizeFirstLetter(item.name) } </span>
                - ${ item.price * item.count}</h4>
            <h5>
                <span className="font-medium">Qty</span>: { item.count }             
                <button className="ml-4 px-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-sm" onClick={ remove }>Remove</button>
            </h5>
        </div>
    );
}

export function ViewCart(props) {
    const [cartItems, setCartItems] = useState([]);
    const [cartIcon, setCartIcon] = useState(null);
    const [cartRect, setCartRect] = useState(null);
    const [listenerAdded, setListenerAdded] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        async function wrapper() {
            let items = await ShoppingCartManager.all();
            setTotalPrice(await ShoppingCartManager.totalPrice());

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
            setCartIcon(document.querySelector(".cart-icon"));
            return;
        }

        if (!cartRect) {
            setCartRect(cartIcon.getBoundingClientRect());
            return;
        }

        if (!listenerAdded) {
            window.addEventListener("resize", () => {
                setCartIcon(document.querySelector(".cart-icon"));
                
                if (!cartIcon) return;
        
                setCartRect(cartIcon.getBoundingClientRect());
            });

            setListenerAdded(true);
        }

    });

    function clearCart() {
        ShoppingCartManager.clearCart();
    }

    if (!cartRect || !cartItems) return;

    const viewStyle = {
        position: "fixed",
        top: `${cartRect.y + 30}px`,
        left: `clamp(0px, calc(${cartRect.x}px - 10rem), 90vw)`,
        margin: "0 1rem"
    }

    return (
        <div style={ viewStyle } className="bg-white rounded p-2 z-20 shadow-lg min-w-[15rem]" { ...props }>
            {/* <svg className="hover:bg-slate-100 cursor-pointer rounded-full" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg> */}
            

            { !cartItems.length > 0 ? "Nothing in cart": cartItems }

            { cartItems.length > 0 ? 
                <div>
                    <p className="text-lg pb-2">Total: <span className="font-medium">${ totalPrice }</span></p>
                    <div className="flex gap-8 py-1">
                        <Link to="/shop/checkout" className="py-1 px-2 font-bold bg-green-600 text-white">Checkout</Link>
                        <button className="py-1 px-2 bg-red-500 text-white font-bold" onClick={ clearCart }>Clear Cart</button>
                    </div>
                </div>
                : ""
            }
            
        </div>
    );
}

export function ShoppingCart(props) {
    const [isViewing, setIsViewing] = useState(false);
    const [listenerAdded, setListenerAdded] = useState(false);
    const [itemCount, setItemCount] = useState(null);

    
    useEffect(() => {
        
        async function wrapper() {
            setItemCount(await ShoppingCartManager.itemCount());
            if (!listenerAdded) {
                window.addEventListener("click", () => {
                    setIsViewing(false);
                });
    
                setListenerAdded(true);
            }
        }
        
        wrapper();

    });

    function handleClick(e) {
        preventDefaults(e);

        if (!isViewing) setIsViewing(true);
        else setIsViewing(false);

    }

    return (
        <div className="relative w-fit cart-icon" onClick={ handleClick }>
            { isViewing ? <ViewCart onClick={ preventDefaults }/>: "" }
            <img src={ `${ process.env.PUBLIC_URL }/icons/cart.svg` } className={ `w-7 interactive-hover cursor-pointer ${ props.className }` }/>
            <span className="cart-notification">{ itemCount == 0 ? "": itemCount }</span>
        </div>
    );
}