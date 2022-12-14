import * as productEndpoints from "../../../endpoints/products";
import * as categoryEndpoints from "../../../endpoints/categories"
import { preventDefaults } from "../../../lib/utils";
import CloseIcon from "../../../components/icons/Close";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";

export default function NewItemModal(props) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        if (!categories) {
           categoryEndpoints.getCategoriesInfo()
            .then(cats => setCategories(cats))
            .catch(err => console.log(err));
        }
    });

    function submit(e) {
        preventDefaults(e);

        setError("");
        setSuccess("");

        productEndpoints.newItem(document.querySelector("#new_product_form"))
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

    if (!categories || !categories.length) {
        return (
            <Modal close={ props.close }>
                <h1 className="text-xl">Please create a product category first</h1>
            </Modal>
        )
    }

    return (
    <Modal close={ props.close }>
        <span 
            className="absolute right-0 top-0 p-1 m-1 shadow rounded-full bg-slate-50 hover:bg-slate-100"
            onClick={ props.close || null }>
            
            <CloseIcon size={ 32 }/>
        </span>

        <h1 className="font-medium text-3xl">New Product</h1>
        <h2 className="font-medium text-xl">Category: { props.category }</h2>
        
        <p className="text-green-600"> { success } </p>
        <p className="text-red-600"> { error } </p>

        <form className="pb-2 flex flex-col gap-4" id="new_product_form" action={ productEndpoints.NEW } method="POST" encType="multipart/form-data" onSubmit={ submit }>
            <input type="hidden" name="category" defaultValue={ props.category } />
            
            <div>
                <label htmlFor="images" className="text-lg">Product Images</label><br/>
                <input type="file" id="images" name="images[]" multiple required/>
            </div>

            <div>
                <label htmlFor="name" className="text-lg">Product Name</label><br/>
                <input type="text" id="name" name="name" className="border" required/>
            </div>

            <div>
                <label htmlFor="stock">Stock:</label><br/>
                <input type="number" name="stock" id="stock" className="border"/>
            </div>

            <div>
                <label htmlFor="description" className="text-lg">Description</label><br/>
                <textarea id="description" name="description" className="border h-40 w-[100%]"></textarea>
            </div>

            <div>
                <label htmlFor="price" className="text-lg">Price</label><br/>
                $<input type="text" id="price" name="price" className="max-w-fit border" required/>
            </div>

            <div>
                <label htmlFor="tax_percent" className="text-lg">Tax Percent</label><br/>
                <input type="text" id="tax_percent" name="tax_percent" className="w-16 max-w-fit border" required/>%
            </div>

            <button className="border px-2 py-1 w-fit rounded hover:bg-slate-50 active:bg-slate-100">Create</button>
        </form>
    </Modal>
    );
}