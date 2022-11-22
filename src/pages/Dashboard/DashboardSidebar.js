import { Sidebar, SidebarItem } from "../../layouts/Sidebar";
import NewItemModal from "../../modals/NewCategoryModal";
import NewCategoryModal from "../../modals/NewCategoryModal";

export default function DashboardSidebar({ modalHandler }) {
    return (
    <Sidebar>
        <h3 className="text-2xl">Admin Actions</h3>
        <div className="mt-5 grid gap-5">
            <SidebarItem onClick={ () => modalHandler.new(NewItemModal) }>New Product</SidebarItem>
            <SidebarItem onClick={ () => modalHandler.new(NewCategoryModal) }>New Category</SidebarItem>
        </div>
    </Sidebar>
    );
}