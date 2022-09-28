import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/nav.css";
import { ShoppingCart } from "./ShoppingCart";

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
        <nav className="nav shadow-lg bg-slate-100">
            <div className="flex gap-4 items-center">
                <img src={ `${ process.env.PUBLIC_URL }/icons/zvg-logo.svg` } alt="logo" className="w-16"/>
                <Link to="/" className="text-2xl underline interactive-hover">Zoar Valley Gifts</Link>
            </div>

            <div className="collapsing-nav-content">
                
                
                <NavLink to="/shop" className="text-xl block text-gray-800 interactive-hover" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>Shop</NavLink>

                <NavLink to="/campground" className="text-xl block text-gray-800 interactive-hover" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>Camp Ground</NavLink>

                <NavLink to="/about" className="text-xl block text-gray-800 interactive-hover" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>About</NavLink>

                <NavLink to="/contact" className="text-xl block text-gray-800 interactive-hover" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>Contact</NavLink>

                <ShoppingCart className="md:ml-5"/>
                
            </div>

            <a className="collapse-btn h-10 w-10 bg-blue-400 grid place-items-center" onClick={ handleCollapse }>demo nav</a>
        </nav>
    );
}