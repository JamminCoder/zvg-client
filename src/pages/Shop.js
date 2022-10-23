import HeroSection from "../components/layouts/HeroSection";
import "../css/shop.css";
import GridEvenContainer from '../components/layouts/GridEvenContainer';
import { CatagoryListingCard } from '../components/Cards';
import { useEffect, useState } from "react";
import { getCatagoriesInfo } from "../api";


function Catagories(props) {
    const [catagories, setCatagories] = useState([]);

    useEffect(() => {
        if (!catagories.length) {
            getCatagoriesInfo().then(cats => {
                console.log(cats);
                const infoArray = [];
                cats.forEach(info => {
                    infoArray.push(
                        <CatagoryListingCard
                            name={ info.catagory }
                            description="Possimus, eius ipsa. Ipsam architecto quod, harum repudiandae dicta soluta eaque at ullam id mollitia"
                        />
                    );
                })
    
                setCatagories(infoArray);
            })
        }
    });

    return (
        <main className="py-24 px-2 md:px-10 flex flex-wrap gap-5">
            { catagories.length ? catagories: "No products" }
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
                
                <Catagories/>
            </div>
        </div>
    );
}