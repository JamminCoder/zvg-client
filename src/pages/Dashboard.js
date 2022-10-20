import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, isLoggedIn } from "../lib/auth";
import { Sidebar, SidebarItem } from "../components/layouts/Sidebar";
import NewItemModal from "../components/modals/NewItemModal";
import { deleteCatagoryByName, getAllProducts, getAllProductsWithCatagories } from "../api";
import { AdminProductCard } from "../components/Cards";
import axios from "axios";


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
    const [catagoriesWithProducts, setCatagoriesWithProducts] = useState([]);
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
                const catagoriesArray = [];
                for (let catagoryName in cats) {
                    const catagory = cats[catagoryName];
                    catagoriesArray.push(catagoryName);
                    catagoryDisplay.push(<CatagoryDisplay key={ catagoryName } catagory={ catagory } catagoryName={ catagoryName } />)
                }
                setCatagories(catagoriesArray);
                setCatagoriesWithProducts(catagoryDisplay);
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

                <div className="grid gap-24 mb-10">
                    { catagoriesWithProducts.length ? catagoriesWithProducts: "No products yet" }
                </div>

                <div>
                    <h3 className="text-xl">Catagories</h3>
                    <div className="flex gap-4 flex-wrap">
                        { catagories.map(cat => {
                            return <div className="shadow p-2">
                                <p>{ cat }</p>
                                <button onClick={() => {
                                    deleteCatagoryByName(cat).then(res => console.log(res));
                                }} className="bg-red-500 text-white p-1">Delete catagory</button>
                            </div>
                        })}
                    </div>
                    
                </div>
            </main>
        </div>
    );
}