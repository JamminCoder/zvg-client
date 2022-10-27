import { useState, useEffect } from "react";
import { getPaypalClientID, getPaypalClientToken } from "../api";
import Button from "./Button";

export function CardIntegration() {
    return (
        <div className="card_container">
            <form id="card-form">
                <label htmlFor="card-number">Card Number</label>
                <div id="card-number" className="card_field"></div>

                <div>
                    <label htmlFor="expiration-date">Expiration Date</label>
                    <div id="expiration-date" className="card_field"></div>
                </div>

                <div>
                    <label htmlFor="cvv">CVV</label><div id="cvv" className="card_field"></div>
                    </div>
                    <label htmlFor="card-holder-name">Name on Card</label>
                    <input type="text" id="card-holder-name" name="card-holder-name" autoComplete="off" placeholder="card holder name"/>
                
                <div>
                    <label htmlFor="card-billing-address-street">Billing Address</label>
                    <input type="text" id="card-billing-address-street" name="card-billing-address-street" autoComplete="off" placeholder="street address"/>
                </div>
                
                <div>
                    <label htmlFor="card-billing-address-unit">&nbsp;</label>
                    <input type="text" id="card-billing-address-unit" name="card-billing-address-unit" autoComplete="off" placeholder="unit"/>
                </div>
                
                <div>
                    <input type="text" id="card-billing-address-city" name="card-billing-address-city" autoComplete="off" placeholder="city"/>
                    </div>
                <div>
                    <input type="text" id="card-billing-address-state" name="card-billing-address-state" autoComplete="off" placeholder="state"/>
                    </div>
                <div>
                    <input type="text" id="card-billing-address-zip" name="card-billing-address-zip" autoComplete="off" placeholder="zip / postal code"/>
                    </div>
                
                <div>
                    <input type="text" id="card-billing-address-country" name="card-billing-address-country" autoComplete="off" placeholder="country code" />
                </div>
                <br/><br/>
                <button value="submit" id="submit" className="btn">Pay</button>
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
            <link rel="stylesheet" type="text/css" href="https://www.paypalobjects.com/webstatic/en_US/developer/docs/css/cardfields.css"/>

            <script
                src={`https://www.paypal.com/sdk/js?components=buttons,hosted-fields&client-id=${ clientID }`}
                data-client-token={ clientToken }
            ></script>

            <PaypalButton/>
            
            <p className="my-5 mx-auto">or pay with credit card</p>

            <CardIntegration/>

            <script src="/checkout.js"></script>
        </div>
    );
}