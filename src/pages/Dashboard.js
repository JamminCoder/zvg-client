import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, isLoggedIn } from "../auth";
import GridEvenContainer from "../components/GridEvenContainer";
import { Sidebar } from "../components/Sidebar";
import { API_PRODUCT_NEW } from "../apiConfig";
import { preventDefaults } from "../utils";
import axios from "axios";


export function NewItemModal(props) {

    function submit(e) {
        preventDefaults(e);

        const images = document.querySelector("#product_images").files;
        const productName = document.querySelector("#product_name").value;
        const productDescription = document.querySelector("#product_description").value;
        const productPrice = document.querySelector("#product_price").value;

        for (let key in images) {
            console.log(images[key]);
        }

        console.log(productName);
        console.log(productDescription);
        console.log(productPrice);

        const form = new FormData(document.querySelector("#new_product_form"));
        axios.post(API_PRODUCT_NEW, form).then(res => {
            console.log(res);
        });

    }

    return (
        <div className="fixed z-50">
            <div className="fixed bg-black opacity-25 w-full h-full"></div>
            <div className="fixed grid place-content-center w-full h-full">
                <div className="shadow bg-white p-8 rounded">
                    <h1 className="text-black font-medium text-3xl">Upload new product</h1>
                    <form id="new_product_form" action={ API_PRODUCT_NEW } method="POST" encType="multipart/form-data" className="py-2 flex flex-col gap-4" onSubmit={ submit }>
                        <div>
                            <label htmlFor="images" className="text-lg">Product Images</label><br/>
                            <input type="file" id="product_images" name="product_images" multiple/>
                        </div>

                        <div>
                            <label htmlFor="product_name" className="text-lg">Product Name</label><br/>
                            <input type="text" id="product_name" name="product_name" className="border"/>
                        </div>

                        <div>
                            <label htmlFor="product_description" className="text-lg">Description</label><br/>
                            <input type="text" id="product_description" name="product_description" className="border"/>
                        </div>

                        <div>
                            <label htmlFor="product_price" className="text-lg">Price</label><br/>
                            $<input type="number" id="product_price" name="product_price" className="max-w-fit border"/>
                        </div>

                        <button className="border px-2 py-1 w-fit rounded hover:bg-slate-50 active:bg-slate-100">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default function Dashboard(props) {
    const [verified, setVerified] = useState("FILLER VALUE");

    useEffect(() => {
        isVerified().then(result => {
            setVerified(result);
        })
    });

    if (!isLoggedIn() || !verified) return <Navigate to="/login"/>;

    return (
        <div className="relative flex bg-slate-50">
            <Sidebar/>

            <GridEvenContainer itemMin="12rem" className="w-[100%]">
                <div className="w-40 h-36 shadow bg-white">

                </div>

                <div className="w-40 h-36 shadow bg-white">

                </div>

                <div className="w-40 h-36 shadow bg-white">

                </div>

                <div className="w-40 h-36 shadow bg-white">

                </div>
            </GridEvenContainer>

            <NewItemModal/>
        </div>
    );
}