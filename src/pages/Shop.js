import HeroSection from "../layouts/HeroSection";
import "../css/shop.css";
import { useEffect, useState } from "react";
import { getCategories, getShopHeader } from "../api";
import { serverURL } from "../lib/utils";
import CategoryDisplay from "../components/CategoryDisplay";

export default function Shop(props) {
    const [shopHeader, setShopHeader] = useState(null);
    const [categories, setCategories] = useState([]);
    const [attempt, setAttempt] = useState(false);

    useEffect(() => {
        if (attempt) return;
        getShopHeader().then(setShopHeader);
        getCategories().then(setCategories);

        setAttempt(true);
    })

    if (!shopHeader) return;

    return (
        <div className="flex flex-col items-center">
            <div className="w-[100%] max-w-[110rem]">
                <HeroSection 
                    className="grid place-items-center max-h-[65vh] w-[100%] aspect-video"
                    bgAlt="filler pic"
                    bgSrc={ serverURL(shopHeader.image_path) }
                >
                    <div className="text-center grid place-items-center bg-white bg-opacity-50 rounded py-12 px-4">
                        <h1 className="text-4xl sm:text-6xl mb-5">{ shopHeader.header }</h1>
                        <p className="max-w-[80%]">{ shopHeader.lead }</p>
                    </div>
                </HeroSection>
                
                <main className="py-24 px-2 md:px-10 grid gap-12">
                    { 
                        categories.length 
                        ? categories.map(cat => <CategoryDisplay category={ cat } />)
                        : "No products" 
                    }
                </main>
            </div>
        </div>
    );
}