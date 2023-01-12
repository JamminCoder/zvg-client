import * as productEndpoints from "../../endpoints/products";
import * as categoryEndpoints from "../../endpoints/categories"
import { preventDefaults, setPreviewImage } from "../../lib/utils";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import TaxSelect from "./TaxSelect";

export default function NewItemPage(props) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState(null);
    const [taxInputUpdated, setTaxInputUpdated] = useState(false);

    const categoryName = useParams().categoryName;

    useEffect(() => {
        if (!categories && !isLoaded) {
           categoryEndpoints.getCategoriesInfo()
            .then(cats => {
                setCategories(cats);
                setIsLoaded(true);

            })
            .catch(err => {
                console.log(err);
                setIsLoaded(true);
            });

        }

        if (!taxInputUpdated) {
            try {
                updateTaxInput();
                setTaxInputUpdated(true);
            } catch(err) {}
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

    function updateTaxInput() {
        const taxInput = document.getElementById("tax_percent");
        const taxPercent = document.getElementById("tax_select").value;
        taxInput.value = taxPercent;
    }

    if (!categories || !categories.length) {
        return (
            <Modal close={ props.close }>
                <h1 className="text-xl">Please create a product category first</h1>
            </Modal>
        )
    }

    return (
    <div className="w-[100%] max-w-[50rem] pb-8">
        <h1 className="font-medium text-3xl">New Product</h1>
        <h2 className="font-medium text-xl mb-8">Category: { categoryName }</h2>
        
        <p className="text-green-600"> { success } </p>
        <p className="text-red-600"> { error } </p>

        <form className="pb-2 flex flex-col gap-4" id="new_product_form" action={ productEndpoints.NEW } method="POST" encType="multipart/form-data" onSubmit={ submit }>
            <input type="hidden" name="category" defaultValue={ props.category } />
            
            <div>
                <img className="bg-slate-200 w-48 aspect-square object-cover mb-4" id="preview_image" src="" alt="Choose a product image" />
                <label htmlFor="images" className="text-lg">Product Images</label><br/>
                <input  onChange={ e => setPreviewImage(e, "preview_image") } type="file" id="images" name="images[]" multiple required/>
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

            <div className="mb-8">
                <label htmlFor="tax_percent" className="text-lg">Tax Percent</label><br/>
                <TaxSelect id="tax_select" onChange={ updateTaxInput }/><br />
                or custom value: <input type="text" id="tax_percent" name="tax_percent" className="w-16 max-w-fit border" required/>%
            </div>

            <Button className="bg-green-600 text-white w-fit">Create</Button>
        </form>
    </div>
    );
}