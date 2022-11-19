import Button from "../components/Button";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import AdminProductCard from "../components/cards/AdminProductCard";
import { deleteCatagoryByName } from "../api";
import { useState } from "react";

export function ProductsList({ catagory }) {
    const [display, setDisplay] = useState(true);
    const [modal, setModal] = useState(null);

    const handleConfirmDelete = () =>
        !modal ? setModal(
            <ConfirmDeleteModal
                catagory={ catagory }
                onClick={ () => setModal(null) }
                cancel={ () => setModal(null) }
                delete={ deleteCatagoryForReal }/>
            ): setModal(null);


    const deleteCatagoryForReal = () => {
        deleteCatagoryByName(catagory.name);
        setDisplay(null);
    }


    if (!display) return;

    return (
    <div>
        { modal }
        <h2 className="text-2xl mb-5">{ catagory.name }</h2>
        
        <div className="flex gap-12 mb-8">
            <Button
                className="text-white bg-gray-800 text-xs rounded" 
                onClick={ () => console.log("edit") }>
                
                Edit { catagory.name } Catagory
            </Button>

            <Button 
                className="text-white bg-red-500 text-xs rounded" 
                onClick={ handleConfirmDelete }>
                
                Delete { catagory.name } Catagory
            </Button>
        </div>

        <div className="flex flex-wrap gap-8 mb-4">
            { catagory.products.map(product => <AdminProductCard key={ product.sku } product={ product } />)}
        </div>
    </div>
    );
}
