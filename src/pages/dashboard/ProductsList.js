import Button from "../../components/Button";
import ConfirmDeleteModal from "./items/ConfirmDeleteModal";
import AdminProductCard from "./AdminProductCard";
import { useState } from "react";
import * as categoryEndpoints from "../../endpoints/categories"
import { Link } from "react-router-dom";

export function ProductsList({ category }) {
    const [display, setDisplay] = useState(true);
    const [modal, setModal] = useState(null);

    const handleConfirmDelete = () =>
        !modal ? setModal(
            <ConfirmDeleteModal
                category={ category }
                close={ () => setModal(null) }
                delete={ deleteCategoryForReal }/>
            ): setModal(null);


    const deleteCategoryForReal = () => {
        categoryEndpoints.deleteCategoryByName(category.name);
        setDisplay(null);
    }


    if (!display) return;

    return (
    <div>
        { modal }
        <h2 className="text-2xl mb-5">{ category.name }</h2>
        
        <div className="flex gap-12 mb-8">
            <Link
            className="text-white bg-gray-800 text-xs btn" 
            to={ `/dashboard/category/${ category.name }/update` }>
                Edit { category.name } Category
            </Link>

            <Button 
                className="text-white bg-red-500 text-xs rounded" 
                onClick={ handleConfirmDelete }>
                
                Delete { category.name } Category
            </Button>
        </div>

        <div className="flex flex-wrap gap-8 mb-4">
            { category.products.map(product => <AdminProductCard key={ product.sku } product={ product } />)}
        </div>

        <Link className="shadow" to={ "new" }>New { category.name } item</Link>
    </div>
    );
}
