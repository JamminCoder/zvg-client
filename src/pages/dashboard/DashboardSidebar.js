import { Sidebar, SidebarItem } from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function DashboardSidebar() {
    const navigate = useNavigate();

    return (
    <Sidebar>
        <h3 className="text-2xl">Admin Actions</h3>
        <div className="mt-5 grid gap-5">
            <SidebarItem onClick={ () => navigate("") }>Dashboard Home</SidebarItem>
            <SidebarItem onClick={ () => navigate("products") }>Products</SidebarItem>
            <SidebarItem onClick={ () => navigate("homepage/slides") }>Manage Homepage Slides</SidebarItem>
            <SidebarItem onClick={ () => navigate("homepage/info") }>Manage Homepage Info Banner</SidebarItem>
            <SidebarItem onClick={ () => navigate("shop-header") }>Manage Shop Header</SidebarItem>
        </div>
    </Sidebar>
    );
}