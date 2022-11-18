import { useEffect, useState } from "react";
import { Sidebar, SidebarItem } from "../layouts/Sidebar";
import NewItemModal from "../modals/NewItemModal";
import { deleteCatagoryByName, getAllProductsWithCatagories } from "../api";
import AdminProductCard from "../components/cards/AdminProductCard";
import DashboardLayout from "../layouts/DashboardLayout";
import Overlay from "../modals/Overlay";
import NewCatagoryModal from "../modals/NewCatagoryModal";
import { stopPropagation } from "../lib/utils";
import Button from "../components/Button";

export function ProductsList({ catagory }) {
    const [display, setDisplay] = useState(true);
    const [modal, setModal] = useState(null);

    const ConfirmDeleteModal = () => 
        <Overlay onClick={() => setModal(null)}>
            <div className="bg-white p-5 grid gap-5" onClick={ stopPropagation }>
                <h1 className="text-3xl font-bold max-w-[30ch]">Are you sure you want to delete this catagory and ALL of its products?</h1>
                <h2 className="text-2xl">Catagory: <span className="text-red-500 font-bold">{ catagory.name }</span></h2>
                

                    <Button
                        className="text-white bg-green-500 font-bold" 
                        onClick={ () => { setModal(null) } }>                            
                        Cancel
                    </Button>

                    <Button
                        className="text-white bg-red-500 w-fit text-xs" 
                        onClick={ deleteCatagoryForReal }>
                        
                        Delete { catagory.name } Catagory
                    </Button>
            </div>
        </Overlay>


    const handleConfirmDelete = () =>
        !modal ? setModal(<ConfirmDeleteModal/>): setModal(null);


    const deleteCatagoryForReal = () => {
        deleteCatagoryByName(catagory.name);
        setDisplay(null);
    }


    if (!display) return;

    return (
    <div>
        { modal }
        <h2 className="text-2xl mb-5">{ catagory.name }</h2>
        <div className="flex flex-wrap gap-8 mb-4">
            { catagory.products.map(product => <AdminProductCard key={ product.sku } product={ product } />)}
        </div>

        <button 
            className="p-2 text-white bg-red-500 text-xs rounded hover:brightness-105 active:brightness-90" 
            onClick={ handleConfirmDelete }>
            
            Delete { catagory.name } Catagory
        </button>
    </div>
    );
}


export function CatagoriesWithProducts(props) {
    const [catagories, setCatagories] = useState([]);
    const [attempt, setAttempt] = useState(false);

    useEffect(() => {
        if (attempt) return;
        if (!catagories.length) {
            getAllProductsWithCatagories()
            .then(cats => setCatagories(cats));
        }

        setAttempt(true);
    });

    return catagories.map(
        catagory => <ProductsList key={ catagory.name } catagory={ catagory } />
    );
}

export default function Dashboard(props) {
    const [modal, setModal] = useState(null);
    
    const handleNewItemModal = () =>
        !modal ? setModal(<NewItemModal close={ () => setModal(null) }/>) : setModal(null);

    const handleNewCatagoryModal = () =>
        !modal ? setModal(<NewCatagoryModal close={ () => setModal(null) }/>) : setModal(null);

    const closeModalIfExists = () => modal ? setModal(null): "";

    return (
        <DashboardLayout onClick={ closeModalIfExists }>
            { modal }

            <Sidebar>
                <h3 className="text-2xl">Admin Actions</h3>
                <div className="mt-5 grid gap-5">
                    <SidebarItem onClick={ handleNewItemModal }>New Product</SidebarItem>
                    <SidebarItem onClick={ handleNewCatagoryModal }>New Catagory</SidebarItem>
                </div>
            </Sidebar>
            
            <main className="p-10 w-[100%]">
                <h1 className="text-3xl pb-5">Products</h1>

                <div className="grid gap-24 mb-10">
                    <CatagoriesWithProducts/>
                </div>
            </main>
        </DashboardLayout>
    );
}