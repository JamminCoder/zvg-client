import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, isLoggedIn } from "../lib/auth";
import GridEvenContainer from "../components/layouts/GridEvenContainer";
import { Sidebar, SidebarItem } from "../components/layouts/Sidebar";
import NewItemModal from "../components/modals/NewItemModal";
import { getAllProducts } from "../api";

export default function Dashboard(props) {
    const [verified, setVerified] = useState("FILLER VALUE");
    const [products, setProducts] = useState(null);

    useEffect(() => {
        isVerified().then(result => {
            setVerified(result);
        })

        if (!products) {
            getAllProducts().then(productArray => {
                const productDisplay = [];
                productArray.forEach(product => {
                    productDisplay.push(
                        <div key={ product.id } className="shadow p-4">
                            <h3>Name: { product.name }</h3>
                            <p>ID: { product.id }</p>
                            
                            <div>Images: { product.images.map(img => {
                                return <p key={ img }>{ img }</p>
                            })}</div>
                            
                        </div>
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

                <GridEvenContainer itemMin="12rem" className="w-[100%] place-content-start">
                    { products || "No products yet"}
                </GridEvenContainer>

            </main>
            

            <NewItemModal/>
        </div>
    );
}