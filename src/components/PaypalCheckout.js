import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ShoppingCartManager from "../lib/shoppingCartManager";
import { API_PAYPAL_ORDER } from "../apiRoutes";
import { WITH_CREDENTIALS, XSRF_HEADER } from "../lib/auth";
import Button from "./Button";


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
    const [productSkus, setProductSkus] = useState(null);
    const [searchParams, _] = useSearchParams();
    const [orderInfo, setOrderInfo] = useState(null);
    const [confirmPaymentButton, setConfirmPaymentButton] = useState(null);

    useEffect(() => {
        if (!productSkus)
            ShoppingCartManager.skusArray().then(skus => {
                setProductSkus(skus);
        });

        if (!orderInfo) {
            const token = searchParams.get("token");
            const payerID = searchParams.get("PayerID");
            if (!( token && payerID ) ) return;
            
            setOrderInfo({
                token: searchParams.get("token"),
                PayerID: searchParams.get("PayerID")
            })
        }

        if (!confirmPaymentButton && orderInfo && productSkus) {
            setConfirmPaymentButton(
                <Button 
                onClick={() => {
                    axios.post(
                        `http://localhost:8000/api/orders/${ orderInfo.token }/capture`, 
                        { skus: productSkus },
                        { headers: { ...XSRF_HEADER }, ...WITH_CREDENTIALS }
                    ).then(res => console.log(res));
                }}

                className="bg-blue-500 text-white">Capture Payment</Button>
            );
        }
    });

    function submit() {
        const formData = new FormData(document.querySelector("#card_form"));

        formData.append("product_skus", productSkus.join(", "));
        

        axios.post(
            API_PAYPAL_ORDER, 
            formData, { 
            headers: XSRF_HEADER, 
            ...WITH_CREDENTIALS 
        })
        .then(res => {
            console.log(res.data);

            res.data.links.forEach(link => {
                if (link.rel == "approve") {
                    window.location.href = link.href;
                }
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="card_container">
            
            <form id="card_form" action={ API_PAYPAL_ORDER } onSubmit={ e => e.preventDefault() }>
                
                {/* <ShippingAndBilling/> */}
                <PaypalButton onClick={ submit } />
                <div className="grid place-items-center mt-4">
                    { confirmPaymentButton }
                </div>
                

            </form>
        </div>
    )
}