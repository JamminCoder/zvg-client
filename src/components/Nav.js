import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/nav.css";
import { ShoppingCart } from "./ShoppingCart";
import IfAuth from "./IfAuth";
import { destroy_login_info } from "../endpoints/auth";
import { getCabinSectionIFrame } from "../endpoints/content";
import { preventDefaults } from "../lib/utils";

function CampgroundLink() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (isLoaded) return;
        
        getCabinSectionIFrame()
        .then(setUrl).catch(console.error)
        .finally(() => setIsLoaded(true));
    });
    
    if (!isLoaded) return <a className="inactive text-xl block text-gray-500" onClick={ preventDefaults }>Camp Ground</a>

    return <a href={ url } className="text-xl block text-gray-800 interactive-hover">Camp Ground</a>;

}

export default function Nav({ cartItems }) {
    const breakpoint = "1000px";
    const [listenerAdded, setListenerAdded] = useState(false);

    

    const [mqMatches, setMqMatches] = useState(
        window.matchMedia(`(min-width: ${ breakpoint })`).matches
    );

    const [itemCount, setItemCount] = useState(null);
    const [collapsingContent, setCollapsingContent] = useState(null);

    useEffect(() => {
        setItemCount(cartItems.length);

        if (!listenerAdded) {
            window.matchMedia(`(min-width: ${ breakpoint })`).addEventListener('change', e => setMqMatches( e.matches ));
            setListenerAdded(true);
        }

        if (!collapsingContent) setCollapsingContent(document.querySelector(".collapsing-nav-content"));
        
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
                <IfAuth>
                    <div className="flex items-center gap-4 ml-4">
                        <NavLink to="/dashboard" className="font-semibold text-xl block text-gray-800 interactive-hover" 
                            style={({ isActive }) =>
                            isActive ? activeLinkStyle : undefined
                        }>Dashboard</NavLink>

                        <a href="#" onClick={ destroy_login_info }>Logout</a>
                    </div>
                    
                </IfAuth>
            </div>

            

            <div className="collapsing-nav-content">

                <NavLink to="/shop" className="text-xl block text-gray-800 interactive-hover" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>Shop</NavLink>

                <NavLink to="/about" className="text-xl block text-gray-800 interactive-hover" 
                    style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                }>About</NavLink>

                <CampgroundLink/>

                <ShoppingCart cartItems={ cartItems }/>
                
            </div>
            
            <div className="relative w-fit collapse-btn ">
                <svg 
                    fill="currentColor" viewBox="0 0 16 16" id="nav-btn"
                    className="h-10 w-10 hover:bg-slate-200 active:bg-slate-300 transition-colors rounded cursor-pointer" onClick={ handleCollapse } xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>    
                </svg>

                <span className="cart-notification">{ itemCount == 0 ? "": itemCount }</span>
            </div>
        </nav>
    );
}