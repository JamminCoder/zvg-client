import HeroSection from "../layouts/HeroSection";
import "../css/shop.css";
import CategoryListingCard from '../components/cards/CategoryListingCard';
import { useEffect, useState } from "react";
import { getCategoriesInfo, getShopHeader } from "../api";
import { serverURL } from "../lib/utils";


function Categories(props) {
    const [categories, setCategories] = useState([]);
    const [attempt, setAttempt] = useState(null);

    useEffect(() => {
        if (!categories.length && !attempt) {
            getCategoriesInfo().then(cats => {
                const infoArray = [];
                cats.forEach(info => {
                    infoArray.push(
                        <CategoryListingCard
                            name={ info.category }
                            imageSrc={ info.image }
                            description={ info.description }
                        />
                    );
                })
    
                setCategories(infoArray);
            })
        }

        setAttempt(true);
    });

    return (
        <main className="py-24 px-2 md:px-10 flex flex-wrap gap-5">
            { categories.length ? categories: "No products" }
        </main>
    );
}


export default function Shop(props) {
    const [shopHeader, setShopHeader] = useState(null);
    const [attempt, setAttempt] = useState(false);

    useEffect(() => {
        if (attempt || shopHeader) return;
        getShopHeader().then(setShopHeader);
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
                
                <Categories/>
            </div>
        </div>
    );
}