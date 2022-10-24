import { API_CATAGORIES_NEW } from "../../apiRoutes";
import { XSRF_HEADER, WITH_CREDENTIALS } from "../../lib/auth";
import { preventDefaults, stopPropagation } from "../../lib/utils";
import CloseIcon from "../icons/Close";
import axios from "axios";
import { useState } from "react";
import Overlay from "./Overlay";

export default function NewCatagoryModal(props) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function submit(e) {
        preventDefaults(e);

        setError("");
        setSuccess("");

        const formData = new FormData(document.querySelector("#new_catagory_form"));
        
        const requestOptions = { 
            headers: XSRF_HEADER, 
            ...WITH_CREDENTIALS 
        };

        axios.post(API_CATAGORIES_NEW, formData, requestOptions).then(res => {
            console.log(res.data);
            if (res.status === 200) {
                setSuccess(`Successfully created new catagory`);
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
    <Overlay>
        {/* Main modal */}
        <div className="shadow bg-white p-8 rounded relative" onClick={ stopPropagation }>
            
            <span 
                className="absolute right-0 top-0 p-1 m-1 shadow rounded-full bg-slate-50 hover:bg-slate-100"
                onClick={ props.close || null }>
                
                <CloseIcon size={ 32 }/>
            </span>

            <h1 className="text-black font-medium text-3xl">New Catagory</h1>
            
            <p className="text-green-600"> { success } </p>
            <p className="text-red-600"> { error } </p>

            <form id="new_catagory_form" action={ API_CATAGORIES_NEW } method="POST" encType="multipart/form-data" className="py-2 flex flex-col gap-4" onSubmit={ submit }>
                <div>
                    <label htmlFor="image" className="text-lg">Header Images</label><br/>
                    <input type="file" id="image" name="image" required/>
                </div>

                <div>
                    <label htmlFor="catagory" className="text-lg">Catagory</label><br/>
                    <input type="text" id="catagory" name="catagory" className="border" required/>
                </div>
                <button className="border px-2 py-1 w-fit rounded hover:bg-slate-50 active:bg-slate-100">Create</button>
            </form>
        </div>
    </Overlay>
    );
}