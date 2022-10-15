import { API_PRODUCT_NEW } from "../../apiConfig";
import { XSRF_HEADER, WITH_CREDENTIALS } from "../../lib/auth";
import { preventDefaults } from "../../lib/utils";
import CloseIcon from "../icons/Close";
import axios from "axios";
import closeActiveModals from "./closeActiveModals";

import { useState } from "react";

export default function NewItemModal(props) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function submit(e) {
        preventDefaults(e);

        setError("");
        setSuccess("");

        const formData = new FormData(document.querySelector("#new_product_form"));
        
        const requestOptions = { 
            headers: XSRF_HEADER, 
            ...WITH_CREDENTIALS 
        };

        axios.post(API_PRODUCT_NEW, formData, requestOptions).then(res => {
            console.log(res.data);
            if (res.status === 200) {
                setSuccess(`Successfully created new product with these images: ${ res.data.images }`);
            }

        }).catch(err => {
            const errors = err.response.data.errors;
            
            for (let error in errors) {
                setError(errors[error]);
                break;
            }

            console.log(err);
        });

    }

    return (
        <div id="new_item_modal" className="fixed z-50 modal" style={{ display: "none" }}>
            <div className="fixed bg-black opacity-25 w-full h-full"></div>
            <div className="fixed grid place-content-center w-full h-full">
                
                {/* Main modal */}
                <div className="shadow bg-white p-8 rounded relative">
                    
                    <span 
                      className="absolute right-0 top-0 p-1 m-1 shadow rounded-full bg-slate-50 hover:bg-slate-100"
                      onClick={ closeActiveModals }>
                      
                        <CloseIcon size={ 32 }/>
                    </span>

                    <h1 className="text-black font-medium text-3xl">Upload new product</h1>
                    
                    <p className="text-green-600"> { success } </p>
                    <p className="text-red-600"> { error } </p>

                    <form id="new_product_form" action={ API_PRODUCT_NEW } method="POST" encType="multipart/form-data" className="py-2 flex flex-col gap-4" onSubmit={ submit }>
                        <div>
                            <label htmlFor="images" className="text-lg">Product Images</label><br/>
                            <input type="file" id="images" name="images[]" multiple required/>
                        </div>

                        <div>
                            <label htmlFor="catagory" className="text-lg">Catagory</label><br/>
                            <input type="text" id="catagory" name="catagory" className="border" required/>
                        </div>

                        <div>
                            <label htmlFor="name" className="text-lg">Product Name</label><br/>
                            <input type="text" id="name" name="name" className="border" required/>
                        </div>

                        <div>
                            <label htmlFor="description" className="text-lg">Description</label><br/>
                            <input type="text" id="description" name="description" className="border"/>
                        </div>

                        <div>
                            <label htmlFor="price" className="text-lg">Price</label><br/>
                            $<input type="number" id="price" name="price" className="max-w-fit border" required/>
                        </div>

                        <button className="border px-2 py-1 w-fit rounded hover:bg-slate-50 active:bg-slate-100">Create</button>
                    </form>
                </div>

            </div>
        </div>
    );
}