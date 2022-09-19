import { useEffect } from "react";
import { useState } from "react";

export default function ShoppingCart(props) {
    const [itemCount, setItemCount] = useState(0);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (itemCount) {
            setNotification(<span className="absolute z-10 right-[-10px] top-[-8px] text-white text-sm bg-green-600 rounded-full aspect-square w-5 grid place-items-center">{ itemCount || null}</span>);
        }
    }, [setNotification, itemCount]);

    return (
        <div className="relative" onClick={() => { setItemCount( itemCount + 1 ) }}>
            { notification }
            <img src={ `${ process.env.PUBLIC_URL }/icons/cart.svg` } className={`w-7 interactive-hover cursor-pointer ${props.className}`}/>
        </div>
    );
}