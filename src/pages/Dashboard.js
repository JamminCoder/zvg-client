import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, isLoggedIn } from "../lib/auth";
import { Sidebar, SidebarItem } from "../components/layouts/Sidebar";
import NewItemModal from "../components/modals/NewItemModal";
import { deleteCatagoryByName, getAllProductsWithCatagories, getCatagoriesInfo } from "../api";
import { AdminProductCard } from "../components/Cards";
import DashboardLayout from "../components/layouts/DashboardLayout";


export function CatagoriesWithProducts(props) {
    const [catagories, setCatagories] = useState([]);

    useEffect(() => {
        if (!catagories.length) {
            getAllProductsWithCatagories().then(cats => {
                const catagoriesArray = [];
                
                for (let catagoryName in cats) {
                    const catagory = cats[catagoryName];
                    catagory.name = catagoryName;
                    catagoriesArray.push(catagory);
                }
    
                setCatagories(catagoriesArray);
            });
        }
    });

    return (
        <>
        {
        catagories.map(catagory => {
            return (
            <div>
                <h2 className="text-2xl mb-5">{ catagory.name }</h2>
                <div className="flex flex-wrap gap-8 mb-4">
                { catagory.map(product => {
                    return <AdminProductCard key={ product.sku } product={ product } />
                }) }
                </div>

                <button className="p-2 text-white bg-red-500 text-xs rounded hover:brightness-105 active:brightness-90" onClick={() => { 
                    deleteCatagoryByName(catagory.name);
                    window.location.reload();
                }}>Delete { catagory.name } Catagory</button>
            </div>
            );
        })}
        </>
    );
}

export default function Dashboard(props) {
    const [verified, setVerified] = useState("FILLER VALUE");
    const [modal, setModal] = useState(null);
    
    function handleNewItemModal() {
        if (!modal) {
            setModal(<NewItemModal close={ () => setModal(null) }/>);
        } else {
            setModal(null);
        }
    }

    function closeModalIfExists() {
        if (modal) setModal(null);
    }


    useEffect(() => {
        isVerified().then(result => {
            setVerified(result);
        })
    });

    if (!isLoggedIn() || !verified) return <Navigate to="/login"/>;

    return (
        <DashboardLayout onClick={ closeModalIfExists }>
            { modal }

            <Sidebar>
                <h3 className="text-2xl">Admin Actions</h3>
                <div className="mt-5 grid gap-5">
                    <SidebarItem>All Products</SidebarItem>
                    <SidebarItem>Stock</SidebarItem>
                    <SidebarItem>Income</SidebarItem>

                    <SidebarItem onClick={ handleNewItemModal }>Create New Product</SidebarItem>
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