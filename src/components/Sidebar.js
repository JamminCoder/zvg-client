export function SidebarItem(props) {
    function handleClick() {
        if (props.onClick) props.onClick();
    }

    return (
        <div className="sidebar-item" onClick={ handleClick }>
            { props.children }
        </div>
    );
}

export function Sidebar(props) {
    return (
        <div className="h-[100vh] w-52 top-0 left-0 sticky shadow-lg pt-24 p-4">
            <h3 className="text-2xl">Admin Actions</h3>
            <div className="mt-5 grid gap-5">
                <SidebarItem>All Products</SidebarItem>
                <SidebarItem>Stock</SidebarItem>
                <SidebarItem>Income</SidebarItem>

                <SidebarItem onClick={ () => {
                    document.querySelector("#new_item_modal").style.display = "block";
                } }>Create New Product</SidebarItem>
            </div>
        </div>
    );
}