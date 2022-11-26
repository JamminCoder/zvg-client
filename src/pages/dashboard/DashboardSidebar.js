import { Sidebar, SidebarItem } from "./Sidebar";
import NewItemModal from "./modals/NewItemModal";
import NewCategoryModal from "./modals/NewCategoryModal";
import { useNavigate } from "react-router-dom";

export default function DashboardSidebar({ modalHandler }) {
    const navigate = useNavigate();

    return (
    <Sidebar>
        <h3 className="text-2xl">Admin Actions</h3>
        <div className="mt-5 grid gap-5">
            <SidebarItem onClick={ () => modalHandler.new(NewItemModal) }>New Product</SidebarItem>
            <SidebarItem onClick={ () => modalHandler.new(NewCategoryModal) }>New Category</SidebarItem>
            <SidebarItem onClick={ () => navigate("slides") }>Manage Homepage Slides</SidebarItem>
        </div>
    </Sidebar>
    );
}