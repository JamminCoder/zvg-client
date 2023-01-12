import { XSRF_HEADER, WITH_CREDENTIALS } from "../../lib/auth";
import { preventDefaults } from "../../lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

import * as categoryEndpoints from "../../endpoints/categories";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";

export default function UpdateCategoryPage(props) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const categoryName = useParams().categoryName;

    const [category, setCategory] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            categoryEndpoints.getCategoryByName(categoryName)
            .then(category => {
                setCategory(category);
                setIsLoaded(true);
            })
            .catch(err => {
                console.error(err);
                setIsLoaded(true);
            })
        }
    })
    
    function submit(e) {
        preventDefaults(e);

        setError("");
        setSuccess("");

        const formData = new FormData(document.querySelector("#update_category_form"));
        
        const requestOptions = { 
            headers: XSRF_HEADER, 
            ...WITH_CREDENTIALS 
        };

        axios.post(categoryEndpoints.UPDATE(category.name), formData, requestOptions).then(res => {
            console.log(res.data);
            if (res.status === 200) {
                navigate("/dashboard/products");
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

    if (!category) return "Loading";

    return (
    <div>
        <h1 className="text-black font-medium text-3xl">Update { category.category } Category</h1>
        
        <p className="text-green-600"> { success } </p>
        <p className="text-red-600"> { error } </p>

        <form id="update_category_form" action={ categoryEndpoints.UPDATE(category.category) } method="POST" encType="multipart/form-data" className="py-2 flex flex-col gap-4" onSubmit={ submit }>
            <input type="hidden" name="target_category" defaultValue={ category.category }/>
            
            <div>
                <label htmlFor="image" className="text-lg">Header Image</label><br/>
                <input type="file" id="image" name="image"/>
            </div>

            <div>
                <label htmlFor="category" className="text-lg">Category</label><br/>
                <input type="text" id="category" name="category" className="border" defaultValue={ category.category } required/>
            </div>

            <div>
                <label htmlFor="description" className="text-lg">Description</label><br/>
                <textarea id="description" name="description" className="border h-40 w-[100%]" defaultValue={ category.description }></textarea>
            </div>
            
            <Button className="bg-green-600 text-white w-fit">Save</Button>
        </form>
    </div>
    );
}