import { useEffect, useState } from "react";
import { Sidebar, SidebarItem } from "../layouts/Sidebar";
import NewItemModal from "../modals/NewItemModal";
import { getAllProductsWithCatagories } from "../api";
import DashboardLayout from "../layouts/DashboardLayout";
import NewCatagoryModal from "../modals/NewCatagoryModal";
import { ProductsList } from "../layouts/ProductsList";

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