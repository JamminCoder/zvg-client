import axios from "axios";
import { useState, useEffect } from "react";
import ShoppingCartManager from "../lib/shoppingCartManager";
import { API_PAYPAL_ORDER } from "../apiRoutes";
import { WITH_CREDENTIALS, XSRF_HEADER } from "../lib/auth";
import Button from "./Button";


export function PaypalButton({ onClick }) {
    return (
        <Button 
        onClick={() => {
            onClick();
        }}

        className="w-[90%] shadow-lg bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold mx-auto my-2 grid place-items-center ">
            Pay with PayPal
        </Button>
    );
}


export default function PaypalCheckout() {
    const [items, setItems] = useState(null);

    useEffect(() => {
        if (!items)
            ShoppingCartManager.all().then(items => {
                console.log(items);
                setItems(items);
        });
    });

    function submit() {
        const formData = new FormData(document.querySelector("#card_form"));

        formData.append("items", "test, test_2");

        axios.post(
            API_PAYPAL_ORDER, 
            formData, { 
            headers: XSRF_HEADER, 
            ...WITH_CREDENTIALS 
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="card_container">
            
            <form id="card_form" action={ API_PAYPAL_ORDER } onSubmit={ e => e.preventDefault() }>
                <input name="items" value={ items } type="hidden"/>
                
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
                <PaypalButton onClick={ submit } />
            </form>
        </div>
    )
}