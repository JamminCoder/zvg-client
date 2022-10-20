import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, isLoggedIn } from "../lib/auth";
import { Sidebar, SidebarItem } from "../components/layouts/Sidebar";
import NewItemModal from "../components/modals/NewItemModal";
import { getAllProducts, getAllProductsWithCatagories } from "../api";
import { AdminProductCard } from "../components/Cards";


export function CatagoryDisplay({ catagory, catagoryName }) {
    if (catagory.length === 0) return;
    return (
        <div>
            <h2 className="text-2xl mb-5">{ catagoryName }</h2>
            <div className="flex flex-wrap gap-8">
            { catagory.map(product => {
                return <AdminProductCard key={ product.sku } product={ product } />
            }) }
            </div>
        </div>
        
    );
}

export default function Dashboard(props) {
    const [verified, setVerified] = useState("FILLER VALUE");
    const [catagories, setCatagories] = useState([]);
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

        if (catagories.length === 0) {
            getAllProductsWithCatagories().then(cats => {
                const catagoryDisplay = [];
                for (let catagoryName in cats) {
                    const catagory = cats[catagoryName];
                    catagoryDisplay.push(<CatagoryDisplay key={ catagoryName } catagory={ catagory } catagoryName={ catagoryName } />)
                }

                setCatagories(catagoryDisplay);
            });
        }
    });

    if (!isLoggedIn() || !verified) return <Navigate to="/login"/>;

    return (
        <div className="relative flex bg-slate-50" onClick={ closeModalIfExists }>
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

                <div className="grid gap-24">
                    { catagories.length ? catagories: "No products yet" }
                </div>

            </main>
        </div>
    );
}