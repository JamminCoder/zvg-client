import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, hasJwt } from "../auth";
import GridEvenContainer from "../components/GridEvenContainer";
import { Sidebar, SidebarItem } from "../components/Sidebar";


export default function Dashboard(props) {
    const [verified, setVerified] = useState("FILLER VALUE");

    useEffect(() => {
        isVerified().then(result => {
            setVerified(result);
        })
    });

    if (!hasJwt() || !verified) return <Navigate to="/login"/>;

    return (
        <div className="relative">
            <Sidebar>
                <SidebarItem>All Products</SidebarItem>
                <SidebarItem>Stock</SidebarItem>
                <SidebarItem>Income</SidebarItem>
            </Sidebar>

            <GridEvenContainer itemMin="12rem">
                DASHBOARD
            </GridEvenContainer>
        </div>
    );
}