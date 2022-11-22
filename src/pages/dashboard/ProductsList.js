import Button from "../../components/Button";
import ConfirmDeleteModal from "../../modals/ConfirmDeleteModal";
import AdminProductCard from "./AdminProductCard";
import { deleteCategoryByName } from "../../api";
import { useState } from "react";

export function ProductsList({ category }) {
    const [display, setDisplay] = useState(true);
    const [modal, setModal] = useState(null);

    const handleConfirmDelete = () =>
        !modal ? setModal(
            <ConfirmDeleteModal
                category={ category }
                onClick={ () => setModal(null) }
                cancel={ () => setModal(null) }
                delete={ deleteCategoryForReal }/>
            ): setModal(null);


    const deleteCategoryForReal = () => {
        deleteCategoryByName(category.name);
        setDisplay(null);
    }


    if (!display) return;

    return (
    <div>
        { modal }
        <h2 className="text-2xl mb-5">{ category.name }</h2>
        
        <div className="flex gap-12 mb-8">
            <Button
                className="text-white bg-gray-800 text-xs rounded" 
                onClick={ () => console.log("edit") }>
                
                Edit { category.name } Category
            </Button>

            <Button 
                className="text-white bg-red-500 text-xs rounded" 
                onClick={ handleConfirmDelete }>
                
                Delete { category.name } Category
            </Button>
        </div>

        <div className="flex flex-wrap gap-8 mb-4">
            { category.products.map(product => <AdminProductCard key={ product.sku } product={ product } />)}
        </div>
    </div>
    );
}
