import axios from "axios";
import { useState, useEffect } from "react";
import { getPaypalClientID, getPaypalClientToken } from "../api";
import { API_PAYPAL_ORDER } from "../apiRoutes";
import { WITH_CREDENTIALS, XSRF_HEADER } from "../lib/auth";
import Button from "./Button";

export function CardIntegration() {

    function submit() {
        const formData = new FormData(document.querySelector("#card_form"));
        axios.post(API_PAYPAL_ORDER, formData, { headers: XSRF_HEADER, ...WITH_CREDENTIALS })
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
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name"/>
                </div>
 
                <div>
                    <label htmlFor="address_street">Billing Address</label>
                    <input type="text" id="billing_address_street" name="billing_address_street" autoComplete="off" placeholder="street address"/>
                </div>
                
                <div>
                    <label htmlFor="address_unit">&nbsp;</label>
                    <input type="text" id="billing_address_unit" name="billing_address_unit" autoComplete="off" placeholder="unit"/>
                </div>
                
                <div>
                    <input type="text" id="address_city" name="billing_address_city" autoComplete="off" placeholder="city"/>
                </div>

                <div>
                    <input type="text" id="address_state" name="billing_address_state" autoComplete="off" placeholder="state"/>
                </div>

                <div>
                    <input type="text" id="address_zip" name="billing_address_zip" autoComplete="off" placeholder="zip / postal code"/>
                </div>
                <PaypalButton onClick={ submit } />
            </form>
        </div>
    )
}

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


export default function PaypalCheckout(props) {
    const [clientToken, setClientToken] = useState(null);
    const [clientID, setClientID] = useState(null);
    const [hasRequestedTokens, setHasRequestedTokens] = useState(false);


    useEffect(() => {
        if (hasRequestedTokens) return;

        if (!clientToken) 
            getPaypalClientToken().then(token => setClientToken(token));
        
        if (!clientID)
            getPaypalClientID().then(id => setClientID(id));

        setHasRequestedTokens(true);
    });


    if (!clientID || !clientToken) return "Requesting PayPal's services; please wait.";

    return (
        <div className="block">
            <CardIntegration/>
        </div>
    );
}