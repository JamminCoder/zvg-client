import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";
import "../css/shop.css";



function CatagoryListing({ name, description, imgSrc, imgAlt }) {
    return (
        <div className="product-listing">
            <div className="product-listing__content">
                <img src={ imgSrc } alt={ imgAlt } className="product-listing__image rounded"/>

                <div className="flex flex-col gap-2 flex-wrap product-listing__data">
                    <h1 className="text-3xl">{ name }</h1>
                    <p className="text-lg text-gray-800 md:max-w-[40ch]">{ description }</p>

                    <Link to={`/shop/${ name }`} className="py-2 px-4 bg-green-600 text-white w-fit rounded">Go to {name} section</Link>
                </div>
            </div>
            

        </div>
    );
}

function Catagories(props) {
    return (
        <div className="py-24 grid xl:grid-cols-2 gap-10">
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