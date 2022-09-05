import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";


function CatagoryListing({ name, description, imgSrc, imgAlt }) {
    return (
        <div className="p-10 bg-slate-50 max-w-[50rem] grid sm:grid-cols-2 gap-10 sm:gap-0">
            <img src={ imgSrc } alt={ imgAlt } className="place-self-center sm:w-52"/>

            <div className="flex flex-col gap-2 justify-center">
                <h1 className="text-3xl">{ name }</h1>
                <p>{ description }</p>
                <Link to={`/shop/${ name.toLowerCase() }`} className="mt-5 py-2 px-4 bg-green-600 text-white  w-fit rounded">Go to { name.toLowerCase() } section.</Link>
            </div>

        </div>
    );
}

function Catagories(props) {
    return (
        <div className="py-24 flex flex-col gap-10">
            <CatagoryListing 
                name="Gifts"
                description="Candles, ornaments, trinkets, photo frames, hiking sticks."
                imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
                imgAlt="Filler image"
            />
            
            <CatagoryListing 
                name="Apparel"
                description="T-Shirts, coats, hats, mittens and more"
                imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
                imgAlt="Filler image"
            />

            <CatagoryListing 
                name="Jewelry"
                description="Necklaces, rings, and earings."
                imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
                imgAlt="Filler image"
            />

            
        </div>
    );
}


export default function Shop(props) {
    return (
        <div className="flex flex-col items-center px-5">
            <div className="w-[100%] max-w-[110rem]">
                <HeroSection 
                    className="grid place-items-center max-h-[65vh] w-[100%] aspect-video"
                    bgAlt="filler pic"
                    bgSrc=""
                >
                    <div className="text-center">
                        <h1 className="text-6xl mb-5">The Shop</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati eius explicabo repudiandae repellendus quisquam tempore.</p>
                    </div>
                </HeroSection>
                
                <Catagories/>
            </div>
        </div>
    );
}