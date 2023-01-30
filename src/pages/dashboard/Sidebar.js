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
        <div className="h-[100vh] w-64 top-0 left-0 sticky shadow-lg pt-24 p-4">
            { props.children }
        </div>
    );
}