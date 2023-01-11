import { preventDefaults, serverURL } from "../../../lib/utils";
import { useEffect, useState } from "react";
import { XSRF_HEADER } from "../../../lib/auth";
import CategorySelect from "../../../components/CategorySelect";

import * as productEndpoints from "../../../endpoints/products";
import * as categoryEndpoints from "../../../endpoints/categories";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
const axios = require("axios").default;

export default function UpdateItemPage(props) {
    const productSKU = useParams().productSKU;
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [categories, setCategories] = useState(null);
    const [product, setProduct] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            categoryEndpoints.getCategoriesInfo()
            .then(cats => setCategories(cats))
            .catch(err => console.log(err));
        }

        if (!isLoaded) {
            productEndpoints.getProductBySKU(productSKU)
            .then(setProduct)
            .catch(console.error);
        }

        setIsLoaded(true);
    });

    function submit(e) {
        preventDefaults(e);
        setError("");

        const formData = new FormData(document.querySelector("#update_product_form"));
        
        const requestOptions = { 
            headers: XSRF_HEADER,
        };

        axios.post(productEndpoints.UPDATE, formData, requestOptions)
        .then(res => {
            navigate("/dashboard/products");
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
        productEndpoints.deleteProductBySKU(product.sku)
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    if (!isLoaded) return "Loading";
    if (!product) return "Something went wrong";

    return (
    <div>
        <h1 className="text-4xl font-medium mb-16">{ product.name }</h1>
        <div className="w-[100%] max-w-[40rem]">
            <div className="flex gap-4 flex-wrap">
                { product.images.map(img_path => {
                    return <img className="w-[10rem] bg-gray-400 aspect-square object-cover object-top" 
                    src={ serverURL(`product_images/${ img_path }`) }/>
                }) }
            </div>

            <div className="py-2">
                <p className="text-red-600"> { error } </p>
                
                <form id="update_product_form" action={ productEndpoints.UPDATE } method="POST" onSubmit={ submit }>
                    <input type="hidden" name="sku" id="sku" defaultValue={ product.sku }/>
                    <div className="flex flex-col gap-2 mb-4">
                        
                        <div className="mb-2">
                            <label htmlFor="images" className="text-lg">Product Images</label><br/>
                            <input type="file" id="images" name="images[]" multiple/>
                        </div>

                        <div className="flex gap-2">
                            <label htmlFor="category">Category: </label>
                            <CategorySelect defaultValue={ product.category } categories={ categories } name="category" id="category"/>
                        </div> 

                        <div className="flex gap-2">
                            <label htmlFor="name">Name: </label><br/>
                            <input type="text" id="name" name="name" className="w-[80%] border" defaultValue={ product.name }/>
                        </div>

                        <div>
                            <label htmlFor="stock">Stock:</label><br/>
                            <input type="number" name="stock" id="stock" className="w-24 border" defaultValue={ product.stock }/>
                        </div>

                        <div className="gap-2">
                            <label htmlFor="price">Price:</label><br/>
                            $<input type="text" id="price" name="price" className="w-24 border" defaultValue={ product.price }/>
                        </div>

                        <div>
                            <label htmlFor="tax_percent" className="text-lg">Tax (in percent)</label><br/>
                            <input type="text" id="tax_percent" name="tax_percent" className="w-16 max-w-fit border" required defaultValue={ product.tax_percent }/>%
                        </div>

                        <div>
                            <label htmlFor="description">Description: </label><br/>
                            <textarea className="w-[100%] h-32 border" name="description" id="description" defaultValue={ product.description }></textarea>
                        </div>
                    </div>

                </form>
                
                <div className="my-2 flex gap-32">
                    <Button className="bg-green-600 text-white w-fit" onClick={ submit }>Save</Button>
                    <Button onClick={ deleteProduct } className="bg-red-500 text-white text-xs w-fit">DELETE</Button>
                </div>
            </div>
        </div>
    </div>
    );
}