import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, isLoggedIn } from "../lib/auth";
import GridEvenContainer from "../components/layouts/GridEvenContainer";
import { Sidebar, SidebarItem } from "../components/layouts/Sidebar";
import NewItemModal from "../components/modals/NewItemModal";
import { deleteProductBySKU, getAllProducts } from "../api";
import { API_PRODUCTS_DELETE_SKU, SERVER_URL } from "../apiRoutes";

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
                        <div key={ product.id } className="shadow p-4">
                            <img src={ `${ SERVER_URL }/product_images/${ product.images[0] }` } />
                            <h3>Name: { product.name }</h3>
                            <p>ID: { product.id }</p>
                            <button onClick={ () => {
                                
                                deleteProductBySKU(product.sku)
                                .then(res => {
                                    console.log(res);
                                    window.location.reload();
                                })
                                .catch(err => {
                                    console.log(err);
                                });

                            } } className="bg-red-500">DELETE</button>
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
                    { products.length ? products: "No products yet" }
                </GridEvenContainer>

            </main>
            

            <NewItemModal/>
        </div>
    );
}