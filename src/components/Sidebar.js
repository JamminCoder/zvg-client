import { useState } from "react";

export function SidebarItem(props) {
    const [className, setClassName] = useState("sidebar-item");


    function handleClick(e) {
        if (className === "sidebar-item") {
            setClassName("sidebar-item--active");
        } else {
            setClassName("sidebar-item");
        }

        if (props.onClick) props.onClick();
    }

    return (
        <div 
            onClick={ handleClick }
            className={ className }>
            
            { props.children }
        </div>
    );
}

export function Sidebar(props) {
    return (
        <div className="h-[100vh] w-48 top-0 left-0 sticky shadow-lg pt-24 p-4">
            <h3 className="text-2xl">Admin Actions</h3>
            <div className="mt-5 grid gap-5">
                { props.children }
            </div>
        </div>
    );
}