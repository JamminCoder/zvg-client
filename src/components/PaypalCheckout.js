import axios from "axios";
import { useState, useEffect } from "react";
import { getPaypalClientID, getPaypalClientToken } from "../api";
import { API_PAYPAL_ORDER } from "../apiRoutes";
import Button from "./Button";

export function CardIntegration() {

    function submit(e) {
        e.preventDefaults();

        const formData = new FormData(document.querySelector("#card_form"));
        axios.post(API_PAYPAL_ORDER, formData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="card_container">
            <form id="card_form" action={ API_PAYPAL_ORDER } onSubmit={ submit }>
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name"/>
                </div>

                <label htmlFor="card_number">Card Number</label>
                <input id="card_number" name="card_number"/>

                <div>
                    <label htmlFor="expiration_date">Expiration Date</label>
                    <input id="expiration_date" name="expiration_date"/>
                </div>

 
                <div>
                    <label htmlFor="billing_address_street">Billing Address</label>
                    <input type="text" id="billing_address_street" name="billing_address_street" autoComplete="off" placeholder="street address"/>
                </div>
                
                <div>
                    <label htmlFor="billing_address_unit">&nbsp;</label>
                    <input type="text" id="billing_address_unit" name="billing_address_unit" autoComplete="off" placeholder="unit"/>
                </div>
                
                <div>
                    <input type="text" id="billing_address_city" name="billing_address_city" autoComplete="off" placeholder="city"/>
                </div>

                <div>
                    <input type="text" id="billing_address_state" name="billing_address_state" autoComplete="off" placeholder="state"/>
                </div>

                <div>
                    <input type="text" id="billing_address_zip" name="billing_address_zip" autoComplete="off" placeholder="zip / postal code"/>
                </div>

                <button>Pay</button>
            </form>
        </div>
    )
}

export function PaypalButton() {
    return (
        <Button 
        onClick={() => {
            console.log("paypal");
        }}

        className="w-[90%] shadow-lg bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold mx-auto grid place-items-center ">
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
            <PaypalButton/>
            
            <p className="my-5 mx-auto">or pay with credit card</p>

            <CardIntegration/>
        </div>
    );
}