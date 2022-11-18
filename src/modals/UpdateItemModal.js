import Overlay from "./Overlay";
import Card from "../components/cards/Card";
import { preventDefaults, serverURL, stopPropagation } from "../lib/utils";
import { deleteProductBySKU } from "../api";
import { API_PRODUCTS_UPDATE } from "../apiRoutes";
import { useEffect, useState } from "react";
import { XSRF_HEADER, WITH_CREDENTIALS } from "../lib/auth";
import { getCatagoriesInfo } from "../api";
import CatagorySelect from "../components/CatagorySelect";

const axios = require("axios").default;

export default function UpdateItemModal({ product }) {
    const [error, setError] = useState("");
    const [catagories, setCatagories] = useState(null);

    useEffect(() => {
        if (!catagories) {
            getCatagoriesInfo()
            .then(cats => setCatagories(cats))
            .catch(err => console.log(err));
        }
    });

    function submit(e) {
        preventDefaults(e);
        setError("");

        const formData = new FormData(document.querySelector("#update_product_form"));
        
        const requestOptions = { 
            headers: XSRF_HEADER, 
            ...WITH_CREDENTIALS 
        };

        axios.post(API_PRODUCTS_UPDATE, formData, requestOptions)
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            const errors = err.response.data.errors;
            
            for (let error in errors) {
                setError(errors[error]);
                break;
            }

            console.log(err);
        });

    }

    function deleteProduct() {  
        deleteProductBySKU(product.sku)
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
    <Overlay>
        <Card className="rounded overflow-hidden bg-white p-1" onClick={ stopPropagation }>
            <div>
                <img className="bg-gray-400 w-[100%] aspect-square object-cover object-top" src={  serverURL(`product_images/${product.images[0]}`) }/>
            </div>

            <div className="py-2">
                <p className="text-red-600"> { error } </p>
                
                <form id="update_product_form" action={ API_PRODUCTS_UPDATE } method="POST" onSubmit={ submit }>
                    <input type="hidden" name="sku" id="sku" defaultValue={ product.sku }/>
                    <div className="flex flex-col gap-2 mb-4">
                        
                        <div className="mb-2">
                            <label htmlFor="images" className="text-lg">Product Images</label><br/>
                            <input type="file" id="images" name="images[]" multiple/>
                        </div>

                        <div className="flex gap-2">
                            <label htmlFor="catagory">Catagory: </label>
                            <CatagorySelect catagories={ catagories } name="catagory" id="catagory"/>
                        </div> 

                        <div className="flex gap-2">
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" className="w-[80%] border" defaultValue={ product.name }/>
                        </div>

                        <div>
                            <label htmlFor="stock">Stock:</label><br/>
                            <input type="number" name="stock" id="stock" className="border" defaultValue={ product.stock }/>
                        </div>

                        <div className="flex gap-2">
                            <label htmlFor="price">Price $</label>
                            <input type="text" id="price" name="price" className="w-[80%] border" defaultValue={ product.price }/>
                        </div>

                        <div>
                            <label htmlFor="description">Description: </label><br/>
                            <textarea className="w-[100%] h-32 border" name="description" id="description" defaultValue={ product.description }></textarea>
                        </div>
                    </div>

                    <button className="bg-gray-800 px-2 py-1 rounded text-white w-fit">Save</button>
                </form>
                
                <div className="my-2">
                    <button onClick={ deleteProduct } className="bg-red-500 p-1 rounded text-white text-xs w-fit">DELETE</button>
                </div>
            </div>
        </Card>
    </Overlay>
    );
}