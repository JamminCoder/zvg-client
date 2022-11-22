import HeroSection from "../layouts/HeroSection";
import "../css/shop.css";
import CategoryListingCard from '../components/cards/CategoryListingCard';
import { useEffect, useState } from "react";
import { getCategoriesInfo } from "../api";


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
    return (
        <div className="flex flex-col items-center">
            <div className="w-[100%] max-w-[110rem]">
                <HeroSection 
                    className="grid place-items-center max-h-[65vh] w-[100%] aspect-video"
                    bgAlt="filler pic"
                    bgSrc=""
                >
                    <div className="text-center grid place-items-center">
                        <h1 className="text-4xl sm:text-6xl mb-5">The Shop</h1>
                        <p className="max-w-[80%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati eius explicabo repudiandae repellendus quisquam tempore.</p>
                    </div>
                </HeroSection>
                
                <Categories/>
            </div>
        </div>
    );
}