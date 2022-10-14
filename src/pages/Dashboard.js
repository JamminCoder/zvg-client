import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, isLoggedIn } from "../lib/auth";
import GridEvenContainer from "../components/layouts/GridEvenContainer";
import { Sidebar, SidebarItem } from "../components/layouts/Sidebar";
import NewItemModal from "../components/modals/NewItemModal";

export default function Dashboard(props) {
    const [verified, setVerified] = useState("FILLER VALUE");

    useEffect(() => {
        isVerified().then(result => {
            setVerified(result);
        })
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

            <GridEvenContainer itemMin="12rem" className="w-[100%]">
                <div className="w-40 h-36 shadow bg-white">

                </div>

                <div className="w-40 h-36 shadow bg-white">

                </div>

                <div className="w-40 h-36 shadow bg-white">

                </div>

                <div className="w-40 h-36 shadow bg-white">

                </div>
            </GridEvenContainer>

            <NewItemModal/>
        </div>
    );
}