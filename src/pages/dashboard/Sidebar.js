import { Link, NavLink } from "react-router-dom";

export function SidebarItem(props) {
    const slate = "rgb(226 232 240)";
    let activeLinkStyle = {
        transform: "translateX(10px)",
        backgroundColor: slate,
        textDecoration: "underline"
    }

    return (
        <NavLink end className="sidebar-item" to={ props.to }
            style={({ isActive }) =>
            isActive ? activeLinkStyle : undefined
        }>{ props.children }</NavLink>

    );
}

export function Sidebar(props) {
    return (
        <div className="h-[100vh] w-64 top-0 left-0 sticky shadow-lg pt-24 p-4">
            { props.children }
        </div>
    );
}