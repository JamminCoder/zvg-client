import { Sidebar, SidebarItem } from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function DashboardSidebar() {
    return (
    <Sidebar>
        <h3 className="text-2xl">Admin Actions</h3>
        <div className="mt-5 grid gap-5">
            <SidebarItem to="">Dashboard Home</SidebarItem>
            <SidebarItem to="about">Manage About Page</SidebarItem>
            <SidebarItem to="account">Admin Account</SidebarItem>
            <SidebarItem to="products">Products</SidebarItem>
            <SidebarItem to="homepage/slides">Manage Homepage Slides</SidebarItem>
            <SidebarItem to="homepage/info">Manage Homepage Info Banner</SidebarItem>
            <SidebarItem to="homepage/cabin">Manage Cabin Section</SidebarItem>
            <SidebarItem to="shop-header">Manage Shop Header</SidebarItem>
        </div>
    </Sidebar>
    );
}