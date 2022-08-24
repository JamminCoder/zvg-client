import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/nav.css"

export default function Nav() {
    const [mqMatches, setMqMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    );

    const [collapsingContent, setCollapsingContent] = useState(
        document.querySelector(".collapsing-nav-content")
    );

    const [nav, setNav] = useState(document.querySelector(".nav"));

    useEffect(() => {
        window.matchMedia("(min-width: 768px)").addEventListener('change', e => setMqMatches( e.matches ));
        setCollapsingContent(document.querySelector(".collapsing-nav-content"));
        if (mqMatches && collapsingContent) collapsingContent.classList.remove("nav-expanded");
    });

    function handleCollapse() {
        collapsingContent.classList.toggle("nav-expanded");
    }

    return (
        <nav className="nav shadow">
            <Link to="/" className="text-2xl">Zoar Valley Gifts</Link>

            <div className="collapsing-nav-content">
                <Link to="/shop" className="text-xl block">Shop</Link>
                <Link to="/campground" className="text-xl block">Camp Ground</Link>
                <Link to="/about" className="text-xl block">About</Link>
                <Link to="/contact" className="text-xl block">Contact</Link>
            </div>

            <a className="collapse-btn md:hidden h-10 w-10 bg-blue-400" onClick={ handleCollapse }></a>
        </nav>
    );
}