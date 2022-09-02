import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/nav.css"

export default function Nav() {
    const [mqMatches, setMqMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    );

    const [collapsingContent, setCollapsingContent] = useState(
        document.querySelector(".collapsing-nav-content")
    );

    useEffect(() => {
        window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMqMatches( e.matches ));
        setCollapsingContent(document.querySelector(".collapsing-nav-content"));
        if (mqMatches && collapsingContent) collapsingContent.classList.remove("nav-expanded");
    });

    function handleCollapse() {
        collapsingContent.classList.toggle("nav-expanded");
    }

    let activeLinkStyle = {
        color: "rgb(0, 0, 0)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.4)"
    };

    return (
        <nav className="nav shadow">
            <Link to="/" className="text-2xl underline">Zoar Valley Gifts</Link>

            <div className="collapsing-nav-content">
                <NavLink to="/shop" className="text-xl block text-gray-800" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>Shop</NavLink>
                <NavLink to="/campground" className="text-xl block text-gray-800" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>Camp Ground</NavLink>

                <NavLink to="/about" className="text-xl block text-gray-800" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>About</NavLink>

                <NavLink to="/contact" className="text-xl block text-gray-800" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>Contact</NavLink>

            </div>

            <a className="collapse-btn md:hidden h-10 w-10 bg-blue-400 grid place-items-center" onClick={ handleCollapse }>demo nav</a>
        </nav>
    );
}