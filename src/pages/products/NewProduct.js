import { API_PRODUCT_NEW } from "../../apiConfig";
import CenterPage from "../../components/CenterPage";
import { useState } from "react";
const axios = require("axios").default;

export default function NewProduct(props) {
    const [result, setResult] = useState("");
    return (
        <>
            <CenterPage>
                <div>
                    <h1 className="text-3xl">New Product</h1>
                    
                    <button className="border" onClick={() => {
                        axios.post(API_PRODUCT_NEW).then(res => {
                            setResult(res.data);
                        });

                    }}>New product</button>
                </div>
                <div>{ result.message }</div>
            </CenterPage>
        </>
    );
}