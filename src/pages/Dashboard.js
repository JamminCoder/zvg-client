import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, isLoggedIn } from "../lib/auth";
import { Sidebar, SidebarItem } from "../components/layouts/Sidebar";
import NewItemModal from "../components/modals/NewItemModal";
import { getAllProducts } from "../api";
import { AdminProductCard } from "../components/Cards";

export default function Dashboard(props) {
    const [verified, setVerified] = useState("FILLER VALUE");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        isVerified().then(result => {
            setVerified(result);
        })

        if (products.length === 0) {
            getAllProducts().then(productArray => {
                const productDisplay = [];
                productArray.forEach(product => {
                    productDisplay.push(
                        <AdminProductCard product={ product } />
                    );
                });

                setProducts(productDisplay);

            }).catch(err => {
                console.log("Something went wrong fetching products");
            });
        }
    });

    if (!isLoggedIn() || !verified) return <Navigate to="/login"/>;

    return (
        <div className="relative flex bg-slate-50">
            <Sidebar>
                <h3 className="text-2xl">Admin Actions</h3>
                <div className="mt-5 grid gap-5">
                    <SidebarItem>All Products</SidebarItem>
                    <SidebarItem>Stock</SidebarItem>
                    <SidebarItem>Income</SidebarItem>

                    <SidebarItem onClick={ () => {
                        document.querySelector("#new_item_modal").style.display = "block";
                    } }>Create New Product</SidebarItem>
                </div>
            </Sidebar>
            
            <main className="p-10 w-[100%]">
                <h1 className="text-3xl pb-5">Products</h1>

                <div className="flex flex-wrap gap-8">
                    { products.length ? products: "No products yet" }
                </div>

            </main>
            

            <NewItemModal/>
        </div>
    );
}