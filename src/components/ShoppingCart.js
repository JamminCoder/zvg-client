import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartManager from "../lib/shoppingCartManager";
import { capatalizeFirstLetter, preventDefaults } from "../lib/utils";

export function Item({ item }) {
    const [itemCount, setItemCount] = useState(item.count);
    const itemClassName = `item-${ item.sku }-qty-selector`;

    useEffect(() => {
        ShoppingCartManager.getBySku(item.sku)
        .then(ITEM => setItemCount(ITEM.count))
    })

    function remove(e) {
        preventDefaults(e);
        ShoppingCartManager.deleteItem(item.sku);
    }

    function updateItemQty(qty) {
        ShoppingCartManager.updateItemQty(item.sku, qty);
        setItemCount(qty);

        const selectors = document.getElementsByClassName(itemClassName);
        for (let selector of selectors) selector.value = qty;
    }

    return (
        <div 
            key={ item.name } 
            className="border-b border-b-gray-300 mb-1 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
        >
            <h4 className="text-lg">
                <span className="font-bold ">{ capatalizeFirstLetter(item.name) } </span>
                - ${ item.price * item.count}
            </h4>
            <h5>
                <span className="font-medium">Qty</span>: { itemCount }
                
                <div>
                    <label>Select quantity: </label>
                    <select className={ itemClassName } defaultValue={ itemCount } onChange={ (e) => updateItemQty(e.target.value) }>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <button className="ml-4 px-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-sm" onClick={ remove }>Remove</button>
            </h5>
        </div>
    );
}

export function ViewCart(props) {
    const cartItems = props.cartItems;
    const [cartItemComponents, setCartItemComponents] = useState([]);
    const [cartIcon, setCartIcon] = useState(null);
    const [cartRect, setCartRect] = useState(null);
    const [listenerAdded, setListenerAdded] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        async function wrapper() {
            setTotalPrice(await ShoppingCartManager.totalPrice());

            let itemComponents = [];
            for (let item of cartItems) {
                itemComponents.push(<Item key={ item.name } item={ item } />)
            }

            setCartItemComponents(itemComponents);
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
    let viewStyle = null;
    if (props.fixed) {
        viewStyle = {
            position: "fixed",
            top: `${cartRect.y + 30}px`,
            left: `clamp(0px, calc(${cartRect.x}px - 10rem), 90vw)`,
            margin: "0 1rem"
        }
    }
    
    return (
        <div style={ viewStyle } className={`bg-white rounded p-2 z-20 shadow-lg min-w-[15rem] ${ props.className }`}>
            { !cartItems.length > 0 ? "Nothing in cart": cartItemComponents }

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
            { isViewing ? <ViewCart cartItems={ props.cartItems } fixed={ true } onClick={ preventDefaults }/>: "" }
            <img src={ `${ process.env.PUBLIC_URL }/icons/cart.svg` } className={ `w-7 interactive-hover cursor-pointer ${ props.className }` }/>
            <span className="cart-notification">{ itemCount == 0 ? "": itemCount }</span>
        </div>
    );
}