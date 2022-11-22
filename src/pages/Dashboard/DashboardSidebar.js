import { Sidebar, SidebarItem } from "../../layouts/Sidebar";
import NewItemModal from "../../modals/NewCatagoryModal";
import NewCatagoryModal from "../../modals/NewCatagoryModal";

export default function DashboardSidebar({ modalHandler }) {
    return (
    <Sidebar>
        <h3 className="text-2xl">Admin Actions</h3>
        <div className="mt-5 grid gap-5">
            <SidebarItem onClick={ () => modalHandler.new(NewItemModal) }>New Product</SidebarItem>
            <SidebarItem onClick={ () => modalHandler.new(NewCatagoryModal) }>New Catagory</SidebarItem>
        </div>
    </Sidebar>
    );
}