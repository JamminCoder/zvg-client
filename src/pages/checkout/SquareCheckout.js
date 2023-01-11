import axios from "axios";
import { useState, useEffect } from "react";
import ShoppingCartManager from "../../lib/shoppingCartManager";
import * as squareEndpoints from "../../endpoints/square";
import { WITH_CREDENTIALS, XSRF_HEADER } from "../../lib/auth";
import Button from "../../components/Button";


export function ShippingAndBilling(props) {
    return (
    <div>
        <div>
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name"/>
        </div>

        <div>
            <label htmlFor="address_street">Billing Address</label>
            <input type="text" id="billing_address_street" name="address_street" autoComplete="off" placeholder="street address"/>
        </div>
        
        <div>
            <label htmlFor="address_unit">&nbsp;</label>
            <input type="text" id="billing_address_unit" name="address_unit" autoComplete="off" placeholder="unit"/>
        </div>
        
        <div>
            <input type="text" id="address_city" name="address_city" autoComplete="off" placeholder="city"/>
        </div>

        <div>
            <input type="text" id="address_state" name="address_state" autoComplete="off" placeholder="state"/>
        </div>

        <div>
            <input type="text" id="address_zip" name="address_zip" autoComplete="off" placeholder="zip / postal code"/>
        </div>
    </div>
    );
}

export function CheckoutButton({ onClick, className }) {
    return (
        <>
        <Button 
        onClick={() => {
            onClick();
        }}

        className={`w-[90%] shadow-lg bg-slate-800 text-white font-bold text-center ${ className ? className: ""}`}>
            Checkout Now
        </Button>
        <p>You will be redirected to Square for checkout</p>
        </>
    );
}


export default function SquareCheckout() {
    const [itemsJSON, setItemsJSON] = useState(null);

    useEffect(() => {
        if (!itemsJSON) ShoppingCartManager.itemsJSON().then(setItemsJSON);
    });

    function submit() {
        const formData = new FormData(document.querySelector("#card_form"));
        const clearCart = formData.get("clear_cart") ? true : false;

        axios.post(
            squareEndpoints.ORDER, 
            formData, { 
            headers: XSRF_HEADER, 
            ...WITH_CREDENTIALS 
        })
        .then(res => {
            console.log(res.data);
            const paymentData = res.data.payment_link;
            const paymentUrl = paymentData.url;
            
            if (clearCart) ShoppingCartManager.clearCart();

            window.location.href = paymentUrl;
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="card_container">
            
            <form id="card_form" action={ squareEndpoints.ORDER } onSubmit={ e => e.preventDefault() }>
                
                {/* <ShippingAndBilling/> */}
                <div className="grid place-items-center">
                    <div className="flex gap-4">
                        <label htmlFor="clear_cart">Clear cart after checkout?</label>
                        <input className="w-8" type="checkbox" name="clear_cart"/>
                    </div>
                    <CheckoutButton onClick={ submit } className="my-4" />
                </div>
                
                <input type="hidden" name="items_json" id="items_json" defaultValue={ itemsJSON }/>
            </form>
        </div>
    )
}