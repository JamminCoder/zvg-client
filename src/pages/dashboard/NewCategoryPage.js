import { preventDefaults } from "../../lib/utils";
import { useState } from "react";
import * as categoryEndpoints from "../../endpoints/categories";

export default function NewCategoryPage(props) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function submit(e) {
        preventDefaults(e);

        setError("");
        setSuccess("");

        categoryEndpoints.newCategory(document.querySelector("#new_category_form"))
        .then(res => {
            console.log(res.data);
            if (res.status === 200) {
                window.location.reload();
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
    <div>
        <h1 className="text-black font-medium text-3xl">New Category</h1>
        
        <p className="text-green-600"> { success } </p>
        <p className="text-red-600"> { error } </p>

        <form id="new_category_form" action={ categoryEndpoints.NEW } method="POST" encType="multipart/form-data" className="py-2 flex flex-col gap-4" onSubmit={ submit }>
            <div>
                <label htmlFor="image" className="text-lg">Header Images</label><br/>
                <input type="file" id="image" name="image" required/>
            </div>

            <div>
                <label htmlFor="category" className="text-lg">Category</label><br/>
                <input type="text" id="category" name="category" className="border" required/>
            </div>

            <div>
                <label htmlFor="description" className="text-lg">Description</label><br/>
                <textarea id="description" name="description" className="border h-40 w-[100%]"></textarea>
            </div>
            
            <button className="border px-2 py-1 w-fit rounded hover:bg-slate-50 active:bg-slate-100">Create</button>
        </form>
    </div>
    );
}